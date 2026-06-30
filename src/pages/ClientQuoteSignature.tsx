import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle2, AlertCircle, FileText, Download, RotateCcw,
  MapPin, Calendar, Truck, ShieldCheck
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import type { Devis } from '../types';

export default function ClientQuoteSignature() {
  const { id } = useParams<{ id: string }>();
  const [devis, setDevis] = useState<Partial<Devis> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [signing, setSigning] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    fetch(`/api/public/devis/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.error);
        setDevis(data.devis);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger le devis. Le lien est peut-être expiré.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (loading || error || !devis || devis.status === 'Signé') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
      setIsCanvasEmpty(true);
    };

    const timer = setTimeout(resizeCanvas, 300);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loading, error, devis?.status]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setIsCanvasEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setIsCanvasEmpty(true);
  };

  const handleSaveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !id || isCanvasEmpty) return;

    setSigning(true);
    try {
      const signatureBase64 = canvas.toDataURL('image/png');
      const response = await fetch(`/api/public/devis/${id}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatureBase64 })
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error);

      setDevis(prev => prev ? { ...prev, status: 'Signé', clientSignature: signatureBase64 } : null);
    } catch (err: any) {
      console.error(err);
      alert('Une erreur est survenue lors de la validation : ' + (err.message || ''));
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-brand-900 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (error || !devis) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <AlertCircle size={48} className="text-red-500 mx-auto" />
          <h1 className="text-xl font-black text-slate-900">Accès refusé</h1>
          <p className="text-slate-500 text-sm leading-relaxed">{error || 'Erreur inconnue.'}</p>
        </div>
      </div>
    );
  }

  const isSigned = devis.status === 'Signé';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-12">
      <Helmet>
        <title>Signature Devis - Marne Transdem</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-white">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">MARNE TRANSDEM</span>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">Validation de Devis</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 mt-8 space-y-6">
        
        {/* Devis Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Devis pour {devis.clientName}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Réf: {devis.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Montant TTC</p>
              <p className="text-2xl font-black text-brand-900">{devis.price} €</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Départ</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <MapPin size={14} className="text-slate-400" />
                {devis.fromCity}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Arrivée</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <MapPin size={14} className="text-brand-900" />
                {devis.toCity}
              </div>
            </div>
            <div className="space-y-1 pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Date</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Calendar size={14} className="text-slate-400" />
                {devis.date}
              </div>
            </div>
            <div className="space-y-1 pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Volume</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Truck size={14} className="text-slate-400" />
                {devis.volume} m³
              </div>
            </div>
          </div>
        </div>

        {/* Signature Area */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          {!isSigned ? (
            <>
              <div className="space-y-1 text-center">
                <ShieldCheck size={32} className="mx-auto text-brand-900 mb-2" />
                <h3 className="text-lg font-black text-slate-900">
                  Signature Électronique
                </h3>
                <p className="text-slate-500 text-sm">
                  Pour valider votre devis, veuillez apposer votre signature ci-dessous.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-48 cursor-crosshair touch-none"
                  />
                  {isCanvasEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm font-semibold">
                      Signez ici (souris ou doigt)
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw size={16} />
                    Effacer
                  </button>
                  <button
                    type="button"
                    disabled={isCanvasEmpty || signing}
                    onClick={handleSaveSignature}
                    className="bg-brand-900 hover:bg-brand-800 disabled:bg-slate-300 text-white rounded-xl px-6 py-3 text-sm font-black flex items-center gap-2 shadow-md transition-colors"
                  >
                    {signing ? 'Enregistrement...' : 'Accepter & Signer'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Devis Validé !</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Votre devis a bien été signé. Notre équipe vous recontactera très rapidement pour préparer votre déménagement.
                </p>
              </div>
              {devis.clientSignature && (
                <div className="mt-6 border border-slate-200 rounded-2xl p-4 bg-slate-50 inline-block">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Votre signature :</p>
                  <img src={devis.clientSignature} alt="Signature" className="h-16 w-auto mix-blend-multiply" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
