import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSyncedCollection } from '../../hooks/useData';
import { Demenagement, UserProfile, Role, FieldMover, FieldTruck } from '../../types';
import { 
  Plus, ArrowRight, Check, Calendar, List, Columns, Map,
  UserCheck, Truck, Users, Clock, FileText, X, AlertCircle,
  MapPin, Phone, Box, HelpCircle, Trash2, Grid, ChevronLeft, ChevronRight, Compass,
  Mic
} from 'lucide-react';
import { DocumentTemplates } from '../../components/admin/DocumentTemplates';
import { InteractiveRoutingMap, getMoveCoords } from '../../components/admin/InteractiveRoutingMap';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { db } from '../../lib/firebase';
import { runTransaction, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { enqueueAction, getOfflineQueue, OfflineAction } from '../../lib/offlineQueue';
import { buildDossierIdFromReference } from '../../lib/dossier-id';
import { getNextSequencedId } from '../../lib/admin-ids';

interface AdminPlanningProps {
  demenagements?: Demenagement[];
  setDemenagements?: React.Dispatch<React.SetStateAction<Demenagement[]>>;
  collaborateurs?: UserProfile[];
  setSelectedMoveDoc?: (move: any | null) => void;
  role?: Role | null;
  searchQuery?: string;
}

export function AdminPlanning({
  demenagements,
  setDemenagements,
  collaborateurs,
  setSelectedMoveDoc,
  role,
  searchQuery
}: AdminPlanningProps) {
  const context = useOutletContext<AdminOutletContextType>();
  const activeSearchQuery = searchQuery || context?.searchQuery || '';

  const { role: authRole } = useAuth();
  const activeRole = role || authRole;

  // Synced states fallback
  const [syncedMoves, setSyncedMoves, { daysLimit: movesDays, setDaysLimit: setMovesDays }] = useSyncedCollection<Demenagement>('demenagements', [], { timeField: 'date' });
  const [allMovesForIds] = useSyncedCollection<Demenagement>('demenagements');
  const [syncedCollabs] = useSyncedCollection<UserProfile>('collaborateurs');
  const [movers] = useSyncedCollection<FieldMover>('movers');
  const [trucks] = useSyncedCollection<FieldTruck>('trucks');

  const activeMoves = demenagements || syncedMoves;
  const activeSetMoves = setDemenagements || setSyncedMoves;
  const activeCollabs = collaborateurs || syncedCollabs;

  const getTruckAssignmentId = (truck: FieldTruck) => truck.plateNumber || truck.id;
  const getTruckDisplayLabel = (truck: FieldTruck) => {
    const label = [truck.plateNumber, truck.type].filter(Boolean).join(' - ');
    return label || truck.id;
  };

  const [showAddDemenagement, setShowAddDemenagement] = useState(false);
  const [localMoveDoc, setLocalMoveDoc] = useState<Demenagement | null>(null);

  // Planning View mode
  const [viewMode, setViewMode] = useState<'list' | 'week' | 'month' | 'gantt' | 'map'>('list');
  const [mapSelectedDate, setMapSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Inline assignment state
  const [activeAssignMoveId, setActiveAssignMoveId] = useState<string | null>(null);
  const [tempMovers, setTempMovers] = useState<string[]>([]);
  const [tempTruck, setTempTruck] = useState<string>('');
  const [isSavingAssignment, setIsSavingAssignment] = useState(false);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    const handleQueueUpdate = () => {
      setPendingActions(getOfflineQueue().filter(a => a.status === 'pending'));
    };

    handleQueueUpdate();

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleQueueUpdate);
      window.addEventListener('offline', handleQueueUpdate);
      window.addEventListener('marne_offline_queue_change', handleQueueUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleQueueUpdate);
        window.removeEventListener('offline', handleQueueUpdate);
        window.removeEventListener('marne_offline_queue_change', handleQueueUpdate);
      }
    };
  }, []);

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, moveId: string } | null>(null);
  const [selectedMove, setSelectedMove] = useState<Demenagement | null>(null);
  const [editingMoveId, setEditingMoveId] = useState<string | null>(null);

  // Voice Recording / Speech-to-Task states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechResult, setSpeechResult] = useState<{ status: string; notes: string; reportedIssues: boolean } | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // GPS Tracking Simulation States & Ref
  const [gpsSimulatingMoveId, setGpsSimulatingMoveId] = useState<string | null>(null);
  const [gpsSimStep, setGpsSimStep] = useState<number>(0);
  const gpsIntervalRef = useRef<any>(null);

  const stopGpsSimulation = () => {
    if (gpsIntervalRef.current) {
      clearInterval(gpsIntervalRef.current);
      gpsIntervalRef.current = null;
    }
    setGpsSimulatingMoveId(null);
    setGpsSimStep(0);
  };

  const startGpsSimulation = async (move: Demenagement) => {
    if (gpsIntervalRef.current) {
      clearInterval(gpsIntervalRef.current);
      gpsIntervalRef.current = null;
    }

    setGpsSimulatingMoveId(move.id);
    setGpsSimStep(0);

    const { from, to } = getMoveCoords(move);
    const totalSteps = 20;
    const intervalTime = 1500; // 1.5 seconds per step, 30 seconds total

    const points: { lat: number; lng: number }[] = [];
    for (let i = 0; i <= totalSteps; i++) {
      const t = i / totalSteps;
      points.push({
        lat: from.lat + (to.lat - from.lat) * t,
        lng: from.lng + (to.lng - from.lng) * t
      });
    }

    let currentStep = 0;

    const runStep = async () => {
      if (currentStep > totalSteps) {
        stopGpsSimulation();
        if (context?.pushNotification) {
          context.pushNotification(
            'Simulation GPS terminée',
            `Le camion pour le chantier de ${move.clientName} est arrivé.`,
            'success'
          );
        }
        return;
      }

      setGpsSimStep(currentStep);

      try {
        const docRef = doc(db, 'demenagements', move.id);
        await updateDoc(docRef, {
          currentLocation: points[currentStep],
          locationUpdatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Failed to update GPS simulation step:", err);
      }

      currentStep++;
    };

    await runStep();
    gpsIntervalRef.current = setInterval(runStep, intervalTime);
  };

  useEffect(() => {
    return () => {
      if (gpsIntervalRef.current) {
        clearInterval(gpsIntervalRef.current);
      }
    };
  }, []);

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const handleCloseDetails = () => {
    setSelectedMove(null);
    setSpeechResult(null);
    setSpeechError(null);
    setIsRecording(false);
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setMediaRecorder(null);
  };

  const startRecording = async () => {
    try {
      setSpeechError(null);
      setSpeechResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          await processSpeechToTask(base64Data);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err: any) {
      console.error("Failed to start recording:", err);
      setSpeechError("Impossible d'accéder au micro. Veuillez vérifier les permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const processSpeechToTask = async (base64Audio: string) => {
    setIsProcessingSpeech(true);
    setSpeechError(null);
    try {
      const response = await fetch('/api/gemini/speech-to-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: base64Audio,
          mimeType: 'audio/webm'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const result = await response.json();
      setSpeechResult(result);
    } catch (err: any) {
      console.error("Error processing speech:", err);
      setSpeechError(err.message || "Erreur lors de la transcription par l'IA.");
    } finally {
      setIsProcessingSpeech(false);
    }
  };

  const applySpeechChanges = (moveId: string) => {
    if (!speechResult) return;
    
    activeSetMoves(prev => prev.map(m => {
      if (m.id === moveId) {
        return {
          ...m,
          status: speechResult.status as any,
          notes: m.notes ? `${m.notes}\n\n[Dictée IA]: ${speechResult.notes}` : speechResult.notes,
          reportedIssues: speechResult.reportedIssues
        };
      }
      return m;
    }));

    setSelectedMove(prev => {
      if (prev && prev.id === moveId) {
        return {
          ...prev,
          status: speechResult.status as any,
          notes: prev.notes ? `${prev.notes}\n\n[Dictée IA]: ${speechResult.notes}` : speechResult.notes,
          reportedIssues: speechResult.reportedIssues
        };
      }
      return prev;
    });

    setSpeechResult(null);
  };

  const handleAutoPlan = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/route/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moves: activeMoves,
          trucks: trucks.map(t => t.name),
          teamLeaders: teamLeaders.map(l => l.name)
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const result = await response.json();
      if (result.success && result.moves) {
        activeSetMoves(result.moves);
        alert("Planification et optimisation des chantiers effectuées avec succès !");
      }
    } catch (err: any) {
      console.error("Auto-plan error:", err);
      alert(err.message || "Erreur lors de l'optimisation des itinéraires.");
    } finally {
      setIsOptimizing(false);
    }
  };

  // Calendar week state (Monday of selected week)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(d.setDate(diff));
    mon.setHours(0, 0, 0, 0);
    return mon;
  });

  // Calendar month state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const changeMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return next;
    });
  };

  const setTodayMonth = () => {
    const d = new Date();
    d.setDate(1);
    setCurrentMonth(d);
  };

  const monthNamesFr = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const monthDays = useMemo(() => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay();
    const paddingDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const gridStartDate = new Date(startOfMonth);
    gridStartDate.setDate(startOfMonth.getDate() - paddingDays);
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStartDate);
      d.setDate(gridStartDate.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      days.push({
        date: d,
        dateStr,
        isCurrentMonth: d.getMonth() === currentMonth.getMonth(),
        dayNum: d.getDate()
      });
    }
    return days;
  }, [currentMonth]);

  const changeWeek = (direction: number) => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + direction * 7);
      return next;
    });
  };

  const setTodayWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(d.setDate(diff));
    mon.setHours(0, 0, 0, 0);
    setCurrentWeekStart(mon);
  };

  const weekDays = useMemo(() => {
    const days = [];
    const weekdaysFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    for (let i = 0; i < 5; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(currentWeekStart.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      days.push({
        dateLabel: weekdaysFr[i],
        formattedDate: `${day}/${month}`,
        dateStr
      });
    }
    return days;
  }, [currentWeekStart]);

  const [newDemenagement, setNewDemenagement] = useState<Partial<Demenagement>>({
    clientName: '', 
    devisId: '', 
    volume: 25, 
    fromCity: '', 
    toCity: '', 
    date: '', 
    teamLeader: 'Hervé Le Gall', 
    status: 'À planifier', 
    crewSize: 3
  });

  const handleDragStart = (e: React.DragEvent, moveId: string) => {
    e.dataTransfer.setData('text/plain', moveId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropMove = async (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    const moveId = e.dataTransfer.getData('text/plain');
    if (!moveId) return;

    const targetMove = activeMoves.find(m => m.id === moveId);
    if (!targetMove) return;

    // If no resources are assigned yet, we can move it safely
    const hasTruck = !!targetMove.assignedTruck;
    const hasMovers = targetMove.assignedMovers && targetMove.assignedMovers.length > 0;

    if (!hasTruck && !hasMovers) {
      activeSetMoves(prev => prev.map(m => m.id === moveId ? { ...m, date: dateStr, status: m.status === 'Terminé' ? 'À planifier' : m.status } : m));
      if (context?.pushNotification) {
        context.pushNotification(
          'Date modifiée', 
          `Le chantier de ${targetMove.clientName} a été déplacé au ${formatDateFr(dateStr)}.`, 
          'success'
        );
      }
      return;
    }

    try {
      // Check for conflicts on the NEW date `dateStr`
      const q = query(collection(db, 'demenagements'), where('date', '==', dateStr));
      const snapshot = await getDocs(q);

      const conflictingMoves: string[] = [];
      const conflictingMovers: string[] = [];

      snapshot.docs.forEach((docSnap) => {
        if (docSnap.id === moveId) return;
        const data = docSnap.data();

        if (hasTruck && data.assignedTruck === targetMove.assignedTruck) {
          conflictingMoves.push(`Véhicule ${targetMove.assignedTruck} déjà affecté (Chantier N° ${docSnap.id})`);
        }

        if (hasMovers && data.assignedMovers) {
          const intersection = targetMove.assignedMovers!.filter((m: string) => data.assignedMovers.includes(m));
          if (intersection.length > 0) {
            conflictingMovers.push(`${intersection.join(', ')} déjà affecté(s) (Chantier N° ${docSnap.id})`);
          }
        }
      });

      if (conflictingMoves.length > 0 || conflictingMovers.length > 0) {
        const errors = [...conflictingMoves, ...conflictingMovers];
        if (context?.pushNotification) {
          context.pushNotification(
            'Conflit de planification', 
            `Déplacement impossible : ${errors.join(' | ')}. Veuillez libérer les ressources d'abord.`, 
            'warning'
          );
        } else {
          alert(`Déplacement impossible : ${errors.join(' | ')}`);
        }
        return;
      }

      // Perform transaction to write the new date
      await runTransaction(db, async (transaction) => {
        const moveDocRef = doc(db, 'demenagements', moveId);
        const freshMoveDoc = await transaction.get(moveDocRef);
        if (!freshMoveDoc.exists()) {
          throw new Error("Le chantier n'existe plus.");
        }

        // Lock other docs on the target date to prevent concurrency issues
        for (const docSnap of snapshot.docs) {
          if (docSnap.id === moveId) continue;
          const freshDoc = await transaction.get(docSnap.ref);
          if (freshDoc.exists()) {
            const currentData = freshDoc.data();
            if (hasTruck && currentData.assignedTruck === targetMove.assignedTruck) {
              throw new Error(`Conflit concurrent : le véhicule ${targetMove.assignedTruck} vient d'être réservé le ${dateStr}.`);
            }
            if (hasMovers && currentData.assignedMovers) {
              const intersection = targetMove.assignedMovers!.filter((m: string) => currentData.assignedMovers.includes(m));
              if (intersection.length > 0) {
                throw new Error(`Conflit concurrent : le(s) déménageur(s) ${intersection.join(', ')} viennent d'être réservés le ${dateStr}.`);
              }
            }
          }
        }

        transaction.update(moveDocRef, {
          date: dateStr,
          status: freshMoveDoc.data().status === 'Terminé' ? 'À planifier' : freshMoveDoc.data().status
        });
      });

      // Update local state on success
      activeSetMoves(prev => prev.map(m => m.id === moveId ? { ...m, date: dateStr, status: m.status === 'Terminé' ? 'À planifier' : m.status } : m));
      
      if (context?.pushNotification) {
        context.pushNotification(
          'Date modifiée', 
          `Le chantier de ${targetMove.clientName} a été déplacé au ${formatDateFr(dateStr)}.`, 
          'success'
        );
      }
    } catch (err: any) {
      console.error("Erreur de déplacement de chantier :", err);
      if (context?.pushNotification) {
        context.pushNotification('Erreur de planification', err.message || "Échec du déplacement.", 'warning');
      } else {
        alert(err.message || "Échec du déplacement.");
      }
    }
  };

  const isMovePast = (moveDate: string) => {
    if (!moveDate) return false;
    try {
      const [year, month, day] = moveDate.split('-').map(Number);
      const moveD = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return moveD < today;
    } catch (e) {
      return false;
    }
  };

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      moveId: id
    });
  };

  const handleAction = (action: 'edit' | 'assign' | 'docs' | 'en_cours' | 'done' | 'delete', id: string) => {
    setContextMenu(null);
    const move = activeMoves.find(m => m.id === id);
    if (!move) return;

    if (action === 'edit') {
      setEditingMoveId(move.id);
      setNewDemenagement({
        clientName: move.clientName,
        devisId: move.devisId,
        volume: move.volume,
        fromCity: move.fromCity,
        toCity: move.toCity,
        date: move.date,
        teamLeader: move.teamLeader,
        status: move.status,
        crewSize: move.crewSize
      });
      setShowAddDemenagement(true);
    } else if (action === 'assign') {
      openAssignmentPanel(move);
    } else if (action === 'docs') {
      handleDocumentClick(move);
    } else if (action === 'en_cours') {
      updateMoveStatus(id, 'En cours');
    } else if (action === 'done') {
      updateMoveStatus(id, 'Terminé');
    } else if (action === 'delete') {
      deleteMove(id);
    }
  };

  const deleteMove = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce chantier ?')) {
      activeSetMoves(prev => prev.filter(m => m.id !== id));
    }
  };

  const savePlanningMove = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMoveId) {
      // Update
      activeSetMoves(prev => prev.map(m => {
        if (m.id === editingMoveId) {
          return {
            ...m,
            clientName: newDemenagement.clientName || m.clientName,
            devisId: newDemenagement.devisId || m.devisId,
            volume: Number(newDemenagement.volume) || m.volume,
            fromCity: newDemenagement.fromCity || m.fromCity,
            toCity: newDemenagement.toCity || m.toCity,
            date: newDemenagement.date || m.date,
            teamLeader: newDemenagement.teamLeader || m.teamLeader,
            crewSize: Number(newDemenagement.crewSize) || m.crewSize,
            status: (newDemenagement.status || m.status) as any
          };
        }
        return m;
      }));
      setEditingMoveId(null);
    } else {
      // Create
      const moveIdSource = allMovesForIds.length > 0 ? allMovesForIds : activeMoves;
      const id = getNextSequencedId('DEM', moveIdSource.map((move) => move.id));
      const item: Demenagement = {
        id,
        dossierId: buildDossierIdFromReference('DEM', id),
        clientName: newDemenagement.clientName || 'Client Déménagement',
        devisId: newDemenagement.devisId || 'SANS-DEVIS',
        volume: Number(newDemenagement.volume) || 20,
        fromCity: newDemenagement.fromCity || 'Mantes',
        toCity: newDemenagement.toCity || 'Versailles',
        date: newDemenagement.date || new Date().toISOString().split('T')[0],
        teamLeader: newDemenagement.teamLeader || 'Hervé Le Gall',
        status: (newDemenagement.status || 'À planifier') as any,
        crewSize: Number(newDemenagement.crewSize) || 2,
        assignedMovers: [],
        assignedTruck: ''
      };
      activeSetMoves(prev => [item, ...prev]);
    }
    setShowAddDemenagement(false);
    setNewDemenagement({ 
      clientName: '', devisId: '', volume: 20, fromCity: '', toCity: '', date: '', teamLeader: 'Hervé Le Gall', status: 'À planifier', crewSize: 3 
    });
  };

  const updateMoveStatus = (id: string, newStatus: Demenagement['status']) => {
    activeSetMoves(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleDocumentClick = (move: Demenagement) => {
    if (setSelectedMoveDoc) {
      setSelectedMoveDoc(move);
    } else {
      setLocalMoveDoc(move);
    }
  };

  const openAssignmentPanel = (move: Demenagement) => {
    setActiveAssignMoveId(move.id);
    setTempMovers(move.assignedMovers || []);
    setTempTruck(move.assignedTruck || '');
    setAssignmentError(null);
  };

  const toggleTempMover = (moverName: string) => {
    setTempMovers(prev => 
      prev.includes(moverName) 
        ? prev.filter(n => n !== moverName) 
        : [...prev, moverName]
    );
  };

  const handleSaveAssignment = async (moveId: string) => {
    const targetMove = activeMoves.find(m => m.id === moveId);
    if (!targetMove) {
      setAssignmentError("Chantier introuvable.");
      return;
    }

    const moveDate = targetMove.date;
    setIsSavingAssignment(true);
    setAssignmentError(null);

    // Offline Queue handling
    if (context && !context.isOnline) {
      try {
        enqueueAction(moveId, {
          assignedMovers: tempMovers,
          assignedTruck: tempTruck,
          previousMovers: targetMove.assignedMovers || [],
          previousTruck: targetMove.assignedTruck || '',
          date: moveDate,
          clientName: targetMove.clientName
        });

        // Optimistic UI Update
        activeSetMoves(prev => prev.map(d => {
          if (d.id === moveId) {
            return {
              ...d,
              assignedMovers: tempMovers,
              assignedTruck: tempTruck,
              status: d.status === 'À planifier' ? 'Programmé' : d.status
            };
          }
          return d;
        }));

        setActiveAssignMoveId(null);
        context.pushNotification(
          'Enregistré en local',
          `L'affectation pour ${targetMove.clientName} a été enregistrée hors-ligne et sera synchronisée automatiquement.`,
          'info'
        );
      } catch (err: any) {
        setAssignmentError(err.message || "Erreur d'enregistrement local.");
      } finally {
        setIsSavingAssignment(false);
      }
      return;
    }

    try {
      // 1. Fetch other moves scheduled on the SAME date to check for potential conflicts
      const q = query(collection(db, 'demenagements'), where('date', '==', moveDate));
      const snapshot = await getDocs(q);

      // Check for conflicts outside the transaction first to fail early
      const conflictingMoves: string[] = [];
      const conflictingMovers: string[] = [];

      snapshot.docs.forEach((docSnap) => {
        if (docSnap.id === moveId) return;
        const data = docSnap.data();

        if (tempTruck && data.assignedTruck === tempTruck) {
          conflictingMoves.push(`Véhicule ${tempTruck} déjà affecté à ${data.clientName} (Chantier N° ${docSnap.id})`);
        }

        if (tempMovers.length > 0 && data.assignedMovers) {
          const intersection = tempMovers.filter((m: string) => data.assignedMovers.includes(m));
          if (intersection.length > 0) {
            conflictingMovers.push(`${intersection.join(', ')} déjà affecté(s) à ${data.clientName} (Chantier N° ${docSnap.id})`);
          }
        }
      });

      if (conflictingMoves.length > 0 || conflictingMovers.length > 0) {
        const errors = [...conflictingMoves, ...conflictingMovers];
        throw new Error(`Conflit de planification : ${errors.join(' | ')}`);
      }

      // 2. Perform transaction to lock the documents and save
      await runTransaction(db, async (transaction) => {
        const moveDocRef = doc(db, 'demenagements', moveId);
        const freshMoveDoc = await transaction.get(moveDocRef);

        if (!freshMoveDoc.exists()) {
          throw new Error("Le chantier n'existe plus.");
        }

        const freshData = freshMoveDoc.data();
        if (freshData.date !== moveDate) {
          throw new Error("La date du chantier a changé entre-temps.");
        }

        // Lock other potentially conflicting documents inside the transaction to verify they haven't changed
        for (const docSnap of snapshot.docs) {
          if (docSnap.id === moveId) continue;

          const freshDoc = await transaction.get(docSnap.ref);
          if (freshDoc.exists()) {
            const currentData = freshDoc.data();
            if (tempTruck && currentData.assignedTruck === tempTruck) {
              throw new Error(`Conflit concurrent : le véhicule ${tempTruck} vient d'être assigné au chantier N° ${docSnap.id}.`);
            }
            if (tempMovers.length > 0 && currentData.assignedMovers) {
              const intersection = tempMovers.filter((m: string) => currentData.assignedMovers.includes(m));
              if (intersection.length > 0) {
                throw new Error(`Conflit concurrent : le(s) déménageur(s) ${intersection.join(', ')} viennent d'être assigné(s) au chantier N° ${docSnap.id}.`);
              }
            }
          }
        }

        // Apply update
        transaction.update(moveDocRef, {
          assignedMovers: tempMovers,
          assignedTruck: tempTruck,
          status: freshData.status === 'À planifier' ? 'Programmé' : freshData.status
        });
      });

      // 3. Update local state on success
      activeSetMoves(prev => prev.map(d => {
        if (d.id === moveId) {
          return {
            ...d,
            assignedMovers: tempMovers,
            assignedTruck: tempTruck,
            status: d.status === 'À planifier' ? 'Programmé' : d.status
          };
        }
        return d;
      }));

      setActiveAssignMoveId(null);
      
      if (context?.pushNotification) {
        context.pushNotification(
          'Affectation enregistrée', 
          `Les ressources ont été assignées avec succès pour ${targetMove.clientName}.`, 
          'success'
        );
      }
    } catch (err: any) {
      console.error("Erreur de transaction d'affectation :", err);
      setAssignmentError(err.message || "Échec de l'enregistrement de l'affectation.");
    } finally {
      setIsSavingAssignment(false);
    }
  };

  const getFilteredDemenagements = (): Demenagement[] => {
    if (!activeSearchQuery) return activeMoves;
    const query = activeSearchQuery.toLowerCase();
    return activeMoves.filter(item => 
      item.clientName.toLowerCase().includes(query) || 
      item.id.toLowerCase().includes(query) ||
      item.fromCity.toLowerCase().includes(query) ||
      item.toCity.toLowerCase().includes(query)
    );
  };

  const getCountdown = (dateStr: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const target = new Date(dateStr);
    target.setHours(0,0,0,0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return { text: "Aujourd'hui", color: "text-red-600 bg-red-100 dark:bg-red-950/30 px-2 py-0.5 rounded-md font-black animate-pulse" };
    if (diffDays === 1) return { text: "Demain", color: "text-amber-700 bg-amber-100 dark:bg-amber-950/20 px-2 py-0.5 rounded-md font-bold" };
    if (diffDays > 1) return { text: `Dans ${diffDays} jours`, color: "text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold" };
    return { text: `Passé (${Math.abs(diffDays)} j)`, color: "text-slate-400 font-light" };
  };

  const teamLeaders = activeCollabs.filter(c => c.role === 'chef_equipe');

  // Gantt 30 days time track generator
  const ganttDays = useMemo(() => {
    const days = [];
    const monthsFr = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dateStr = `${d.getFullYear()}-${month}-${day}`;
      days.push({ 
        day, 
        monthLabel: monthsFr[d.getMonth()],
        dateStr 
      });
    }
    return days;
  }, []);

  const formatDateFr = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const filteredDemenagements = getFilteredDemenagements();
  const todayMovesCount = filteredDemenagements.filter(move => move.date === todayStr).length;
  const unassignedCount = filteredDemenagements.filter(
    move => !move.assignedTruck || !move.assignedMovers || move.assignedMovers.length === 0
  ).length;

  return (
    <div className="space-y-5">
      
      {/* Header Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 p-5">
          <div className="min-w-[260px]">
            <p className="text-[11px] font-black text-slate-400 tracking-[0.16em] uppercase">Planification terrain</p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white tracking-tight">Opérations & logistique</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[420px]">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 px-3 py-2">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Affichés</span>
                <span className="text-lg font-black text-slate-950 dark:text-white">{filteredDemenagements.length}</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 px-3 py-2">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Aujourd'hui</span>
                <span className="text-lg font-black text-slate-950 dark:text-white">{todayMovesCount}</span>
              </div>
              <div className="rounded-lg border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/10 px-3 py-2">
                <span className="block text-[9px] font-black uppercase tracking-wider text-amber-600">À affecter</span>
                <span className="text-lg font-black text-amber-800 dark:text-amber-300">{unassignedCount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:items-end gap-3">
            {/* Toggle buttons */}
            <div className="bg-slate-100/80 dark:bg-slate-950 p-1 rounded-lg border border-slate-200/70 dark:border-slate-800 flex flex-wrap gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <List size={14} /> Liste
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-2 rounded-md text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'week'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Calendar size={14} /> Semaine
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 rounded-md text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'month'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Calendar size={14} /> Mensuel
              </button>
              <button
                onClick={() => setViewMode('gantt')}
                className={`px-3 py-2 rounded-md text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'gantt'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Columns size={14} /> Charge
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Map size={14} /> Carte
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 flex-wrap">
              {/* Period Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Période</label>
                <select
                  value={movesDays}
                  onChange={(e) => setMovesDays(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 text-xs font-black text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
                >
                  <option value={90}>90 derniers jours</option>
                  <option value={180}>180 derniers jours</option>
                  <option value={365}>1 an</option>
                  <option value="all">Toutes les archives</option>
                </select>
              </div>

              {activeRole !== 'chef_equipe' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAutoPlan}
                    disabled={isOptimizing}
                    className="h-10 bg-slate-950 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-900 dark:border-slate-700 font-black px-4 rounded-lg text-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Compass className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
                    {isOptimizing ? 'Optimisation...' : 'Auto-plan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDemenagement(true)}
                    className="h-10 bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black px-4 rounded-lg text-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus size={14} /> Planifier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddDemenagement && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-350 dark:border-slate-700 p-6 rounded-3xl space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b pb-3 mb-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white font-black">
              {editingMoveId ? 'Modifier le Chantier' : 'Nouveau Chantier au Registre'}
            </h3>
            <button onClick={() => { setShowAddDemenagement(false); setEditingMoveId(null); }} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer">Fermer [X]</button>
          </div>
          <form onSubmit={savePlanningMove} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Nom du client</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Gérard Lhermitte" value={newDemenagement.clientName} onChange={e=>setNewDemenagement({...newDemenagement, clientName: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Métrage cubique (m³)</label>
              <input required type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.volume} onChange={e=>setNewDemenagement({...newDemenagement, volume: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Ville de départ</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="Paris" value={newDemenagement.fromCity} onChange={e=>setNewDemenagement({...newDemenagement, fromCity: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Ville de destination</label>
              <input type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="Lyon" value={newDemenagement.toCity} onChange={e=>setNewDemenagement({...newDemenagement, toCity: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Date du transport</label>
              <input required type="date" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.date} onChange={e=>setNewDemenagement({...newDemenagement, date: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Chef d'équipe conducteur</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={newDemenagement.teamLeader} onChange={e=>setNewDemenagement({...newDemenagement, teamLeader: e.target.value})}>
                {teamLeaders.length > 0 ? (
                  teamLeaders.map(c => (
                    <option key={c.uid} value={c.name}>{c.name}</option>
                  ))
                ) : (
                  <>
                    <option value="Hervé Le Gall">Hervé Le Gall (Équipe 1)</option>
                    <option value="Ahmed Bensalah">Ahmed Bensalah (Équipe 2)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Taille théorique de l'équipage</label>
              <input type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.crewSize} onChange={e=>setNewDemenagement({...newDemenagement, crewSize: Number(e.target.value)})} />
            </div>
            
            <div className="md:col-span-3 pt-2">
              <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-3 rounded-xl font-bold cursor-pointer transition-all">
                {editingMoveId ? 'Enregistrer les modifications' : 'Consigner et charger le planning'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredDemenagements.map((move) => {
            const isAssigning = activeAssignMoveId === move.id;
            const countdownInfo = getCountdown(move.date);

            return (
              <div 
                key={move.id} 
                draggable={true}
                onDragStart={(e) => handleDragStart(e, move.id)}
                onClick={() => setSelectedMove(move)}
                onContextMenu={(e) => handleContextMenu(e, move.id)}
                className={`relative overflow-hidden border rounded-xl bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer select-none ${
                  isMovePast(move.date) && move.status !== 'Terminé'
                    ? 'border-slate-200 dark:border-slate-800 opacity-75 text-slate-500'
                    : 'border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white'
                }`}
              >
                <div className={`absolute inset-y-0 left-0 w-1 ${
                  move.status === 'Terminé'
                    ? 'bg-emerald-500'
                    : move.status === 'En cours'
                      ? 'bg-purple-500'
                      : move.status === 'Programmé'
                        ? 'bg-sky-500'
                        : 'bg-amber-500'
                }`} />

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(260px,1.25fr)_minmax(300px,1fr)_minmax(240px,0.85fr)_180px] items-center gap-5 pl-2">
                  {/* Left info */}
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-md border border-slate-200/70 dark:border-slate-800">
                        {move.id}
                      </span>
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase ${
                        move.status === 'À planifier' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/20 dark:text-amber-400' :
                        move.status === 'Programmé' ? 'bg-sky-50 text-slate-700 dark:bg-sky-950/30 dark:text-sky-400' :
                        move.status === 'En cours' ? 'bg-purple-100 text-purple-900 dark:bg-purple-950/20 dark:text-purple-400' : 
                        'bg-green-150 text-green-900 dark:bg-green-950/20 dark:text-green-400'
                      }`}>
                        {move.status}
                      </span>
                      
                      {/* Countdown badge */}
                      {move.status !== 'Terminé' && (
                        <span className={`text-[9.5px] uppercase font-black rounded-md ${countdownInfo.color}`}>
                          {countdownInfo.text}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-[15px] font-black text-brand-950 dark:text-white tracking-tight flex items-center gap-1.5 truncate">
                      {move.clientName}
                      {pendingActions.some(a => a.moveId === move.id) && (
                        <Clock size={12} className="text-amber-500 animate-pulse shrink-0" title="En attente de synchronisation" />
                      )}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium min-w-0">
                      <span className="truncate">{move.fromCity}</span>
                      <ArrowRight size={10} className="text-accent shrink-0" />
                      <span className="truncate">{move.toCity}</span>
                    </div>
                  </div>

                  {/* Middle metrics */}
                  <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-xs min-w-0 xl:border-l xl:border-slate-200 dark:xl:border-slate-800 xl:pl-5">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-black uppercase tracking-wider">Volume</span>
                      <span className="font-extrabold text-slate-800 dark:text-white">{move.volume} m³</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-black uppercase tracking-wider">Transport</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{formatDateFr(move.date)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-black uppercase tracking-wider">Chef</span>
                      <span className="font-semibold text-slate-800 dark:text-white capitalize">{move.teamLeader}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-black uppercase tracking-wider">Équipe</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{move.crewSize} Coéquipiers</span>
                    </div>
                  </div>

                  {/* Operational assignment tags details */}
                  <div className="flex flex-col gap-2 bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800 p-3 rounded-lg text-xs min-w-0">
                    <div>
                      <span className="text-[8.5px] text-slate-400 block uppercase font-black tracking-wider">Équipe terrain</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {move.assignedMovers && move.assignedMovers.length > 0 ? (
                          move.assignedMovers.map(name => (
                            <span key={name} className="bg-white text-brand-800 dark:bg-slate-900 dark:text-brand-350 px-2 py-1 rounded-md border border-slate-200/70 dark:border-slate-800 text-[10px] font-semibold">
                              {name.split(' ')[0]}
                            </span>
                          ))
                        ) : (
                          <span className="text-amber-600 dark:text-amber-500 text-[10px] flex items-center gap-1 font-bold">
                            <AlertCircle size={10} /> Aucun équipier assigné
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <span className="text-[8.5px] text-slate-400 block uppercase font-black tracking-wider">Véhicule</span>
                      {move.assignedTruck ? (
                        <span className="text-brand-950 dark:text-accent font-extrabold flex items-center gap-1 mt-0.5">
                          <Truck size={10} /> {move.assignedTruck}
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-500 text-[10px] flex items-center gap-1 font-bold">
                          <AlertCircle size={10} /> Aucun véhicule affecté
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-1 gap-2 w-full xl:w-[180px]">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDocumentClick(move); }}
                      className="h-9 w-full bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold px-3 rounded-lg text-[10px] uppercase cursor-pointer border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText size={13} /> Documents
                    </button>

                    {activeRole !== 'chef_equipe' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); openAssignmentPanel(move); }}
                        className="h-9 w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 font-black px-3 rounded-lg text-[10px] uppercase cursor-pointer transition-all flex items-center justify-center gap-2"
                      >
                        <Users size={13} /> Affecter
                      </button>
                    )}

                    {move.status === 'À planifier' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateMoveStatus(move.id, 'Programmé'); }}
                        className="h-9 w-full bg-accent hover:bg-accent-hover text-brand-950 font-black px-3 rounded-lg text-[10px] uppercase cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Check size={13} /> Valider
                      </button>
                    )}
                    {move.status === 'Programmé' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateMoveStatus(move.id, 'En cours'); }}
                        className="h-9 w-full bg-slate-950 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-750 font-extrabold px-3 rounded-lg text-[10px] cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Truck size={13} /> Démarrer
                      </button>
                    )}
                    {move.status === 'En cours' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateMoveStatus(move.id, 'Terminé'); }}
                        className="h-9 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 rounded-lg text-[10px] uppercase cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Check size={13} /> Livrer
                      </button>
                    )}
                    {move.status === 'Terminé' && (
                      <div className="h-9 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 rounded-lg border border-emerald-500/10 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                        <Check size={12} /> Réalisé
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignment drawer */}
                {isAssigning && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in text-xs"
                  >
                    {/* Movers Selection */}
                    <div className="space-y-3 bg-slate-50/70 dark:bg-slate-950/40 p-4 rounded-lg border border-slate-200/70 dark:border-slate-800">
                      <h5 className="font-black text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                        <Users size={14} className="text-brand-900 dark:text-accent" />
                        Choisir l'équipe terrain disponible
                      </h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {movers.map(mover => {
                          const isChecked = tempMovers.includes(mover.name);
                          return (
                            <label 
                              key={mover.id} 
                              className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                                isChecked 
                                  ? 'bg-brand-50 border-brand-200/60 dark:bg-brand-900/15 dark:border-brand-900/40' 
                                  : 'bg-white border-slate-200/50 dark:bg-slate-900 dark:border-slate-805 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  className="accent-brand-900 dark:accent-accent"
                                  checked={isChecked} 
                                  onChange={() => toggleTempMover(mover.name)} 
                                />
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-slate-800 dark:text-slate-200">{mover.name}</span>
                                  <span className="text-[9px] text-slate-400 block">{mover.role} ({mover.status})</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Truck Selection */}
                    <div className="space-y-3 bg-slate-50/70 dark:bg-slate-950/40 p-4 rounded-lg border border-slate-200/70 dark:border-slate-800">
                      <h5 className="font-black text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                        <Truck size={14} className="text-brand-900 dark:text-accent" />
                        Choisir le véhicule disponible
                      </h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {trucks.map(truck => {
                          const isSelected = tempTruck === truck.plateNumber;
                          return (
                            <label 
                              key={truck.id} 
                              className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                                isSelected 
                                  ? 'bg-brand-50 border-brand-200/60 dark:bg-brand-900/15 dark:border-brand-900/40' 
                                  : 'bg-white border-slate-200/50 dark:bg-slate-900 dark:border-slate-805 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  name="truckSelection"
                                  className="accent-brand-900 dark:accent-accent"
                                  checked={isSelected} 
                                  onChange={() => setTempTruck(truck.plateNumber)} 
                                />
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-slate-800 dark:text-slate-200">{truck.plateNumber}</span>
                                  <span className="text-[9px] text-slate-400 block">{truck.type} ({truck.capacity} m³) - {truck.status}</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {assignmentError && (
                      <div className="md:col-span-2 bg-red-50 dark:bg-red-955/20 border border-red-200 dark:border-red-900/35 p-3 rounded-lg flex items-start gap-2.5 text-[11px] text-red-600 dark:text-red-400 font-medium">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <div className="flex-1 leading-normal">{assignmentError}</div>
                        <button 
                          onClick={() => setAssignmentError(null)}
                          className="text-red-400 hover:text-red-650 font-bold shrink-0 ml-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                      <button 
                        onClick={() => {
                          setActiveAssignMoveId(null);
                          setAssignmentError(null);
                        }}
                        disabled={isSavingAssignment}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 cursor-pointer disabled:opacity-50"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={() => handleSaveAssignment(move.id)}
                        disabled={isSavingAssignment}
                        className="px-5 py-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 font-black rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isSavingAssignment && <Clock size={12} className="animate-spin" />}
                        {isSavingAssignment ? "Enregistrement..." : (context && !context.isOnline) ? "Enregistrer hors-ligne" : "Enregistrer l'Affectation"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filteredDemenagements.length === 0 && (
            <div className="py-14 text-center text-slate-400 font-light border border-dashed border-slate-250 dark:border-slate-800 rounded-xl bg-white/60 dark:bg-slate-900/30">
              Aucun chantier de déménagement trouvé.
            </div>
          )}
        </div>
      )}

      {/* Calendar Week View */}
      {viewMode === 'week' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          {/* Calendar Controller */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="text-accent" size={16} />
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Navigation semaine</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeWeek(-1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Semaine précédente"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={setTodayWeek}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 border border-slate-200/30 rounded-xl text-[10px] font-black text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                Aujourd'hui
              </button>
              <button 
                onClick={() => changeWeek(1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Semaine suivante"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Grille */}
          <div className="min-w-[800px] grid grid-cols-5 gap-4 items-stretch">
            {weekDays.map(day => {
              const dayJobs = getFilteredDemenagements().filter(m => m.date === day.dateStr);
              const isToday = day.dateStr === todayStr;
              return (
                <div 
                  key={day.dateStr} 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropMove(e, day.dateStr)}
                  className={`flex flex-col rounded-2xl border p-4 space-y-3 min-h-[400px] transition-all ${
                    isToday 
                      ? 'bg-slate-50/50 dark:bg-slate-950/20 border-accent/40' 
                      : 'bg-slate-50/20 dark:bg-slate-950/5 border-slate-100 dark:border-slate-800/80'
                  }`}
                >
                  {/* Column Header */}
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2 text-center select-none">
                    <span className={`text-xs font-black uppercase tracking-wider block ${
                      isToday ? 'text-brand-900 dark:text-accent' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {day.dateLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                      {day.formattedDate}
                    </span>
                  </div>

                  {/* Moves List */}
                  <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto">
                    {dayJobs.map(move => (
                      <div 
                        key={move.id} 
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, move.id)}
                        onClick={() => setSelectedMove(move)}
                        onContextMenu={(e) => handleContextMenu(e, move.id)}
                        className={`p-3.5 rounded-2xl border text-xs leading-tight space-y-2 hover:shadow-md transition-all shadow-2xs cursor-pointer select-none ${
                          move.status === 'Terminé'
                            ? 'bg-emerald-50/70 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30 text-emerald-955 dark:text-emerald-300'
                            : move.status === 'En cours'
                              ? 'bg-purple-50/70 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30 text-purple-955 dark:text-purple-300'
                              : isMovePast(move.date)
                                ? 'bg-slate-50 dark:bg-slate-950/45 text-slate-400 border border-slate-200 dark:border-slate-800 opacity-60'
                                : 'bg-amber-50/70 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 text-amber-955 dark:text-amber-300'
                        }`}
                      >
                        <div className="flex justify-between items-start font-black">
                          <span className="truncate max-w-[95px] flex items-center gap-1">
                            {move.clientName}
                            {pendingActions.some(a => a.moveId === move.id) && (
                              <Clock size={10} className="text-amber-500 animate-pulse shrink-0" title="En attente de synchronisation" />
                            )}
                          </span>
                          <span className="text-[8.5px] uppercase bg-white/40 dark:bg-black/20 px-1 py-0.5 rounded font-black tracking-wider">
                            {move.id}
                          </span>
                        </div>

                        <div className="text-[10px] opacity-75 font-semibold">
                          {move.volume} m³ • Chef: {move.teamLeader.split(' ')[0]}
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] opacity-80 pt-1 border-t border-dashed border-slate-200/50 dark:border-slate-800/80">
                          <span className="truncate">{move.fromCity.split(' ')[0]} ➔ {move.toCity.split(' ')[0]}</span>
                        </div>

                        {move.assignedTruck && (
                          <div className="text-[9px] font-bold text-accent-hover dark:text-accent flex items-center gap-1 pt-1">
                            <Truck size={10} /> {move.assignedTruck}
                          </div>
                        )}
                      </div>
                    ))}
                    {dayJobs.length === 0 && (
                      <div className="flex-1 flex items-center justify-center border border-dashed border-slate-200/40 dark:border-slate-800/40 rounded-xl p-4 text-[10px] text-slate-400 italic text-center select-none">
                        Aucun chantier
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Month View */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          {/* Calendar Controller */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="text-accent" size={16} />
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                {monthNamesFr[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Mois précédent"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={setTodayMonth}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 border border-slate-200/30 rounded-xl text-[10px] font-black text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                Aujourd'hui
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Mois suivant"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Grille Mensuelle */}
          <div className="min-w-[800px] border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-2.5 text-center text-xs font-black uppercase tracking-wider text-slate-400">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mer</div>
              <div>Jeu</div>
              <div>Ven</div>
              <div>Sam</div>
              <div>Dim</div>
            </div>

            {/* Table Body */}
            <div className="grid grid-cols-7 grid-rows-6 divide-y divide-x divide-slate-100 dark:divide-slate-800/80 bg-slate-100/30 dark:bg-slate-950/10">
              {monthDays.map((day, idx) => {
                const dayJobs = getFilteredDemenagements().filter(m => m.date === day.dateStr);
                const isToday = day.dateStr === todayStr;
                return (
                  <div 
                    key={day.dateStr + '-' + idx} 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropMove(e, day.dateStr)}
                    className={`p-2 min-h-[105px] flex flex-col gap-1.5 ${
                      day.isCurrentMonth 
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200' 
                        : 'bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-600'
                    } ${isToday ? 'ring-2 ring-inset ring-accent/60' : ''}`}
                  >
                    {/* Day number header */}
                    <div className="flex justify-between items-center select-none">
                      <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                        isToday 
                          ? 'bg-accent text-brand-950 font-black' 
                          : day.isCurrentMonth ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'
                      }`}>
                        {day.dayNum}
                      </span>
                      {dayJobs.length > 0 && (
                        <span className="bg-brand-900 text-white dark:bg-accent dark:text-brand-950 text-[7.5px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                          {dayJobs.length} {dayJobs.length > 1 ? 'chantiers' : 'chantier'}
                        </span>
                      )}
                    </div>

                    {/* Jobs list */}
                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[75px] scrollbar-thin">
                      {dayJobs.map(move => (
                        <div 
                          key={move.id} 
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, move.id)}
                          onClick={(e) => { e.stopPropagation(); setSelectedMove(move); }}
                          onContextMenu={(e) => handleContextMenu(e, move.id)}
                          className={`p-1 px-1.5 rounded-lg text-[8.5px] leading-tight space-y-0.5 hover:border-accent dark:hover:border-accent transition-all shadow-2xs truncate cursor-pointer select-none ${
                            move.status === 'Terminé'
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-300'
                              : move.status === 'En cours'
                                ? 'bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100/50 dark:border-purple-900/30 text-purple-900 dark:text-purple-300'
                                : isMovePast(move.date)
                                  ? 'bg-slate-50 dark:bg-slate-950/55 text-slate-400 border border-slate-200 dark:border-slate-800 opacity-60'
                                  : 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100/50 dark:border-amber-900/30 text-amber-900 dark:text-amber-300'
                          }`}
                          title={`${move.clientName} - ${move.volume}m³ - ${move.fromCity} ➔ ${move.toCity}`}
                        >
                          <div className="flex justify-between items-center font-bold">
                            <span className="truncate max-w-[65px] flex items-center gap-0.5">
                              {move.clientName}
                              {pendingActions.some(a => a.moveId === move.id) && (
                                <Clock size={8} className="text-amber-500 animate-pulse shrink-0" title="En attente de synchronisation" />
                              )}
                            </span>
                            <span className="text-[7.5px] font-bold shrink-0">{move.volume}m³</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Gantt View */}
      {viewMode === 'gantt' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          <div className="min-w-[950px] space-y-2">
            {/* Gantt header days row */}
            <div className="grid grid-cols-12 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="col-span-3 text-xs font-black uppercase text-slate-400 tracking-wider">Chantiers</div>
              
              {/* Timeline segment days details */}
              <div className="col-span-9 grid gap-0 text-center" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                {ganttDays.map((gd, idx) => (
                  <div 
                    key={gd.dateStr} 
                    className={`text-[9px] font-bold py-1 border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-center items-center ${
                      idx === 0 ? 'bg-accent/15 text-brand-900 dark:text-accent font-black rounded-t-lg' : ''
                    }`}
                  >
                    <span>{gd.day}</span>
                    <span className="text-[7px] font-medium text-slate-400">{gd.monthLabel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt chantiers rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/65">
              {getFilteredDemenagements().map(move => {
                return (
                  <div key={move.id} className="grid grid-cols-12 py-3 items-center hover:bg-slate-50/50 dark:hover:bg-slate-950/20 rounded-xl px-1">
                    {/* Left details */}
                    <div 
                      onClick={() => setSelectedMove(move)}
                      className="col-span-3 pr-4 space-y-0.5 cursor-pointer hover:opacity-80 transition-opacity select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-bold text-slate-400">{move.id}</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate max-w-[120px] hover:text-brand-900 dark:hover:text-white transition-colors flex items-center gap-1">
                          {move.clientName}
                          {pendingActions.some(a => a.moveId === move.id) && (
                            <Clock size={10} className="text-amber-500 animate-pulse shrink-0" title="En attente de synchronisation" />
                          )}
                        </h4>
                      </div>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                        {move.fromCity.split(' ')[0]} ➔ {move.toCity.split(' ')[0]} ({move.volume} m³)
                      </p>
                    </div>

                    {/* Timeline grid */}
                    <div className="col-span-9 grid gap-0 h-9 items-center" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                      {ganttDays.map(gd => {
                        const isJobDay = move.date === gd.dateStr;
                        return (
                          <div 
                            key={gd.dateStr} 
                            className="h-full border-r border-slate-100 dark:border-slate-800/80 flex items-center justify-center relative"
                          >
                            {isJobDay && (
                              <div 
                                onClick={() => setSelectedMove(move)}
                                className={`absolute inset-x-0.5 h-6 rounded-lg text-[8px] font-black uppercase text-center flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all truncate px-0.5 ${
                                  move.status === 'À planifier' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-300/40 hover:bg-amber-200 dark:hover:bg-amber-900' :
                                  move.status === 'Programmé' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-400 border border-sky-300/40 hover:bg-sky-200 dark:hover:bg-sky-900' :
                                  move.status === 'En cours' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400 border border-purple-300/40 hover:bg-purple-200 dark:hover:bg-purple-900' :
                                  'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-450 border border-emerald-300/40 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                                }`}
                                title={`${move.clientName} (${move.volume} m³) - ${move.status}`}
                              >
                                {move.volume}m³
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {getFilteredDemenagements().length === 0 && (
                <div className="py-12 text-center text-xs text-slate-400">Aucun planning disponible.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px] animate-fade-in">
          {/* Left Panel: Day Filter & Trucks/Jobs List */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex flex-col space-y-4 max-h-[700px] overflow-y-auto">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Date d'opération :</label>
              <input
                type="date"
                value={mapSelectedDate}
                onChange={(e) => setMapSelectedDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 text-xs font-black text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
              />
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

            <div className="space-y-3 flex-grow overflow-y-auto pr-1">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Répartition des Équipes ({getFilteredDemenagements().filter(m => m.date === mapSelectedDate).length})
              </h4>
              
              {/* List of Trucks and their jobs */}
              {trucks.map(truck => {
                const truckAssignmentId = getTruckAssignmentId(truck);
                const truckLabel = getTruckDisplayLabel(truck);
                const truckMoves = getFilteredDemenagements().filter(m => m.date === mapSelectedDate && m.assignedTruck === truckAssignmentId);
                const getTruckColor = (name: string) => {
                  if (name.includes('20m³')) return 'bg-indigo-500';
                  if (name.includes('12m³')) return 'bg-amber-500';
                  return 'bg-emerald-500';
                };

                return (
                  <div key={truck.id} className="border border-slate-100 dark:border-slate-800/80 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${getTruckColor(truckLabel)}`} />
                        <span className="text-[11px] font-black text-brand-900 dark:text-white uppercase">{truckLabel}</span>
                      </div>
                      <span className="text-[9px] bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded-md text-slate-500 font-extrabold">{truckMoves.length}</span>
                    </div>

                    {truckMoves.length === 0 ? (
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 italic font-light">Aucune affectation</p>
                    ) : (
                      <div className="space-y-1.5 pl-2.5 border-l border-slate-200 dark:border-slate-800">
                        {truckMoves.map((move, idx) => (
                          <div 
                            key={move.id}
                            onClick={() => setSelectedMove(move)}
                            className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-xl cursor-pointer transition-all active:scale-98"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Étape {idx + 1}</span>
                              <span className="text-[8.5px] uppercase font-black text-slate-400">{move.id}</span>
                            </div>
                            <h5 className="text-[11px] font-extrabold text-brand-900 dark:text-slate-100 line-clamp-1">{move.clientName}</h5>
                            <p className="text-[9.5px] text-slate-500 dark:text-slate-400">{move.fromCity} ➔ {move.toCity}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Unassigned moves for this date */}
              {(() => {
                const unassignedMoves = getFilteredDemenagements().filter(m => m.date === mapSelectedDate && (!m.assignedTruck || m.assignedTruck === 'Non assigné'));
                if (unassignedMoves.length === 0) return null;

                return (
                  <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-3 space-y-2 bg-slate-50/50 dark:bg-slate-950/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400 uppercase">Non Assignés</span>
                      <span className="text-[9px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-md font-extrabold">{unassignedMoves.length}</span>
                    </div>

                    <div className="space-y-1.5 pl-2.5">
                      {unassignedMoves.map(move => (
                        <div 
                          key={move.id}
                          onClick={() => setSelectedMove(move)}
                          className="p-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850/60 border border-slate-200/50 dark:border-slate-800 rounded-xl cursor-pointer transition-all active:scale-98"
                        >
                          <h5 className="text-[11px] font-extrabold text-brand-900 dark:text-slate-100 line-clamp-1">{move.clientName}</h5>
                          <p className="text-[9.5px] text-slate-500 dark:text-slate-400">{move.fromCity} ➔ {move.toCity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Panel: The Map */}
          <div className="lg:col-span-3 h-[600px] lg:h-[700px]">
            <InteractiveRoutingMap 
              moves={getFilteredDemenagements().filter(m => m.date === mapSelectedDate)}
              selectedMove={selectedMove}
              onSelectMove={(move) => setSelectedMove(move)}
            />
          </div>
        </div>
      )}

      {/* Local Document Templates Modal Fallback */}
      {localMoveDoc && (
        <DocumentTemplates 
          move={localMoveDoc} 
          onClose={() => setLocalMoveDoc(null)} 
        />
      )}

      {/* Details Modal */}
      {selectedMove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
              <div>
                <span className="text-[10px] uppercase font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800 mr-2">
                  {selectedMove.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  selectedMove.status === 'À planifier' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/20 dark:text-amber-400' :
                  selectedMove.status === 'Programmé' ? 'bg-sky-50 text-slate-700 dark:bg-sky-955/30 dark:text-sky-400' :
                  selectedMove.status === 'En cours' ? 'bg-purple-100 text-purple-900 dark:bg-purple-950/20 dark:text-purple-400' : 
                  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                }`}>
                  {selectedMove.status}
                </span>
              </div>
              <button 
                onClick={handleCloseDetails}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold cursor-pointer"
              >
                Fermer [X]
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">{selectedMove.clientName}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Trajet</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedMove.fromCity} ➔ {selectedMove.toCity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Date de transport</span>
                      <span className="font-semibold text-slate-900 dark:text-white capitalize">
                        {formatDateFr(selectedMove.date)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <UserCheck size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Chef d'équipe</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{selectedMove.teamLeader}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Box size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Volume</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {selectedMove.volume} m³
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Users size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Membres d'équipage ({selectedMove.crewSize})</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedMove.assignedMovers && selectedMove.assignedMovers.length > 0 ? (
                          selectedMove.assignedMovers.map(name => (
                            <span key={name} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-200/50 dark:border-slate-700">
                              {name}
                            </span>
                          ))
                        ) : (
                          <span className="text-amber-600 dark:text-amber-500 text-[10px] italic font-bold">
                            Aucun équipier affecté
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Truck size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Véhicule assigné</span>
                      {selectedMove.assignedTruck ? (
                        <span className="font-extrabold text-brand-900 dark:text-accent block mt-0.5">
                          {selectedMove.assignedTruck}
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-500 text-[10px] italic font-bold">
                          Aucun véhicule affecté
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">ID Devis lié</span>
                      <span className="font-mono text-slate-900 dark:text-white font-bold">{selectedMove.devisId}</span>
                    </div>
                  </div>
                  
                  {/* Notes & Comments */}
                  {selectedMove.notes && (
                    <div className="flex items-start gap-2.5 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3">
                      <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Notes de livraison</span>
                        <p className="font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl mt-1 whitespace-pre-line border border-slate-100 dark:border-slate-850">
                          {selectedMove.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reported Issues */}
                  {selectedMove.reportedIssues && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 p-3 rounded-2xl flex items-center gap-2.5 text-red-700 dark:text-red-400">
                      <AlertCircle size={16} className="shrink-0" />
                      <div>
                        <span className="font-black text-[9px] uppercase tracking-wider block">Litige / Incident</span>
                        <span className="font-semibold">Un incident ou litige a été signalé sur ce chantier.</span>
                      </div>
                    </div>
                  )}

                  {/* GPS Tracking Simulation (Visible when status === 'En cours') */}
                  {selectedMove.status === 'En cours' && (
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">🚚 Suivi GPS Temps Réel (Simulateur)</span>
                        {gpsSimulatingMoveId === selectedMove.id && (
                          <span className="flex items-center gap-1.5 text-accent text-[9px] font-black animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" /> SIMULATION ACTIVE
                          </span>
                        )}
                      </div>

                      {gpsSimulatingMoveId === selectedMove.id ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            <span>Progression : Étape {gpsSimStep + 1} / 21</span>
                            <span>{Math.round((gpsSimStep / 20) * 100)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-accent h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${(gpsSimStep / 20) * 100}%` }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={stopGpsSimulation}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <X size={14} /> Arrêter la simulation
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                            Simulez en temps réel le déplacement du camion de <strong>{selectedMove.fromCity}</strong> vers <strong>{selectedMove.toCity}</strong> (durée : 30 secondes). Le client verra le camion se déplacer en direct sur son portail.
                          </p>
                          <button
                            type="button"
                            onClick={() => startGpsSimulation(selectedMove)}
                            className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-2 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-brand-950 dark:border-accent-hover"
                          >
                            <Compass size={14} /> Démarrer la simulation GPS (30s)
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Voice Dictation Speech-to-Task */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">🎙️ Rapport Vocal Intelligent</span>
                      {isRecording && (
                        <span className="flex items-center gap-1.5 text-red-550 text-[9px] font-black animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-red-600" /> DICTÉE EN COURS...
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          disabled={isProcessingSpeech}
                          className="flex-1 bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-2 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-brand-950 dark:border-accent-hover disabled:opacity-50"
                        >
                          <Mic size={14} /> Commencer la dictée
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse"
                        >
                          <X size={14} /> Terminer et Analyser
                        </button>
                      )}
                    </div>

                    {isProcessingSpeech && (
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-brand-900 animate-spin" />
                        Gemini analyse la dictée...
                      </div>
                    )}

                    {speechError && (
                      <p className="text-[10px] font-bold text-red-600">{speechError}</p>
                    )}

                    {speechResult && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl space-y-2 text-[11px] animate-fade-in shadow-sm">
                        <div className="flex items-center justify-between border-b pb-1.5 border-slate-100 dark:border-slate-800">
                          <span className="font-black text-slate-400 uppercase tracking-wider text-[9px]">Résultats extraits</span>
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase ${
                            speechResult.status === 'Terminé' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20'
                          }`}>
                            Statut : {speechResult.status}
                          </span>
                        </div>
                        <p className="italic text-slate-600 dark:text-slate-400 font-medium">"{speechResult.notes}"</p>
                        <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-100 dark:border-slate-800">
                          <span className={`font-bold ${speechResult.reportedIssues ? 'text-red-600' : 'text-slate-400'}`}>
                            {speechResult.reportedIssues ? '⚠️ Incident détecté' : '✅ Aucun incident'}
                          </span>
                          <button
                            type="button"
                            onClick={() => applySpeechChanges(selectedMove.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-black transition-colors"
                          >
                            Appliquer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end gap-3 flex-wrap">
              <button
                onClick={() => {
                  setSelectedMove(null);
                  handleAction('edit', selectedMove.id);
                }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 cursor-pointer transition-all"
              >
                Modifier
              </button>
              {activeRole !== 'chef_equipe' && (
                <button
                  onClick={() => {
                    setSelectedMove(null);
                    openAssignmentPanel(selectedMove);
                  }}
                  className="px-4 py-2 bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 font-black rounded-lg text-xs cursor-pointer transition-all flex items-center gap-2"
                >
                  <Users size={13} /> Affecter
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedMove(null);
                  handleDocumentClick(selectedMove);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-extrabold rounded-lg text-xs cursor-pointer transition-all border border-slate-200/50 dark:border-slate-700 flex items-center gap-2"
              >
                <FileText size={13} /> Documents
              </button>
              {selectedMove.status === 'À planifier' && (
                <button
                  onClick={() => {
                    updateMoveStatus(selectedMove.id, 'Programmé');
                    setSelectedMove(null);
                  }}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 text-sky-600 border border-sky-500/10 rounded-xl text-xs font-black cursor-pointer transition-all"
                >
                  Valider
                </button>
              )}
              {selectedMove.status === 'Programmé' && (
                <button
                  onClick={() => {
                    updateMoveStatus(selectedMove.id, 'En cours');
                    setSelectedMove(null);
                  }}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-black cursor-pointer transition-all"
                >
                  Démarrer
                </button>
              )}
              {selectedMove.status === 'En cours' && (
                <button
                  onClick={() => {
                    updateMoveStatus(selectedMove.id, 'Terminé');
                    setSelectedMove(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black cursor-pointer transition-all"
                >
                  Livrer (Terminer)
                </button>
              )}
              <button
                onClick={() => {
                  const id = selectedMove.id;
                  setSelectedMove(null);
                  deleteMove(id);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black cursor-pointer transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40 cursor-default" 
            onClick={() => setContextMenu(null)}
            onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }}
          />
          <div 
            className="fixed z-50 min-w-[170px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 text-xs text-slate-700 dark:text-slate-200 animate-fade-in"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => handleAction('edit', contextMenu.moveId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              Modifier le chantier
            </button>
            {activeRole !== 'chef_equipe' && (
              <button
                onClick={() => handleAction('assign', contextMenu.moveId)}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-brand-900 dark:text-accent"
              >
                Affecter équipe
              </button>
            )}
            <button
              onClick={() => handleAction('docs', contextMenu.moveId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            >
              Voir les documents
            </button>
            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
            <button
              onClick={() => handleAction('en_cours', contextMenu.moveId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-purple-600 dark:text-purple-400"
            >
              Marquer en cours
            </button>
            <button
              onClick={() => handleAction('done', contextMenu.moveId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-emerald-600 dark:text-emerald-400"
            >
              Marquer terminé
            </button>
            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
            <button
              onClick={() => handleAction('delete', contextMenu.moveId)}
              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-red-600 dark:text-red-400"
            >
              Supprimer
            </button>
          </div>
        </>
      )}

    </div>
  );
}
