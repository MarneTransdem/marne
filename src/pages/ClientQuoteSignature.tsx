import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, AlertCircle, FileText, RotateCcw,
  MapPin, Calendar, Truck, ShieldCheck, CreditCard, Lock, Loader2, X
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import type { Devis } from '../types';

const ACOMPTE_PERCENT = 30;

export default function ClientQuoteSignature() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [devis, setDevis] = useState<Partial<Devis> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [signing, setSigning] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Payment result from Stripe redirect
  const paymentResult = searchParams.get('payment');

  const fetchDevis = () => {
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
  };

  useEffect(() => {
    fetchDevis();
  }, [id]);

  // Refresh after coming back from Stripe (success)
  useEffect(() => {
    if (paymentResult === 'success') {
      setTimeout(fetchDevis, 1500);
    }
  }, [paymentResult]);

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

  const handlePayAcompte = async () => {
    if (!id) return;
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const response = await fetch(`/api/public/devis/${id}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error);

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err: any) {
      console.error(err);
      setPaymentError(err.message || 'Erreur lors de la création du paiement.');
      setPaymentLoading(false);
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
  const isAcomptePaid = devis.paymentStatus === 'Acompte Payé' || devis.paymentStatus === 'Intégralement Payé';
  const acompteAmount = devis.price ? Math.round(devis.price * ACOMPTE_PERCENT / 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-16">
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
          {isSigned && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Signé
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 mt-8 space-y-6">

        {/* Payment result banners */}
        {paymentResult === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
            <p className="text-emerald-800 text-sm font-semibold">
              🎉 Paiement confirmé ! Votre acompte a bien été reçu. Vous recevrez un email de confirmation.
            </p>
          </div>
        )}
        {paymentResult === 'cancel' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <X size={20} className="text-amber-500 shrink-0" />
            <p className="text-amber-800 text-sm font-semibold">
              Le paiement a été annulé. Vous pouvez réessayer ci-dessous.
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="bg-white border border-slate-200 rounded-3xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${isSigned ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-brand-900 border-brand-900 text-white'}`}>
                {isSigned ? <CheckCircle2 size={16} /> : '1'}
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500">Signature</span>
            </div>
            <div className={`h-0.5 flex-1 mb-5 ${isSigned ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${isAcomptePaid ? 'bg-emerald-500 border-emerald-400 text-white' : isSigned ? 'bg-brand-900 border-brand-900 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                {isAcomptePaid ? <CheckCircle2 size={16} /> : '2'}
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500">Acompte</span>
            </div>
            <div className={`h-0.5 flex-1 mb-5 ${isAcomptePaid ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${isAcomptePaid ? 'bg-brand-900 border-brand-900 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                3
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500">Confirmé</span>
            </div>
          </div>
        </div>
        
        {/* Devis Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Devis pour {devis.clientName}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Réf: {devis.id}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Montant TTC</p>
              <p className="text-2xl font-black text-brand-900">{devis.price?.toLocaleString('fr-FR')} €</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Départ</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <MapPin size={14} className="text-slate-400" /> {devis.fromCity}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Arrivée</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <MapPin size={14} className="text-brand-900" /> {devis.toCity}
              </div>
            </div>
            <div className="space-y-1 pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Date</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Calendar size={14} className="text-slate-400" /> {devis.date}
              </div>
            </div>
            <div className="space-y-1 pt-4 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Volume</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Truck size={14} className="text-slate-400" /> {devis.volume} m³
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
                <h3 className="text-lg font-black text-slate-900">Étape 1 — Signature Électronique</h3>
                <p className="text-slate-500 text-sm">
                  Veuillez apposer votre signature ci-dessous pour valider votre accord.
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
                    <RotateCcw size={16} /> Effacer
                  </button>
                  <button
                    type="button"
                    disabled={isCanvasEmpty || signing}
                    onClick={handleSaveSignature}
                    className="bg-brand-900 hover:bg-brand-800 disabled:bg-slate-300 text-white rounded-xl px-6 py-3 text-sm font-black flex items-center gap-2 shadow-md transition-colors"
                  >
                    {signing ? <><Loader2 size={16} className="animate-spin" /> Enregistrement...</> : 'Accepter & Signer'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-black text-slate-900">Devis signé électroniquement</p>
                <p className="text-slate-500 text-xs mt-0.5">Votre signature a bien été enregistrée et archivée.</p>
              </div>
              {devis.clientSignature && (
                <img src={devis.clientSignature} alt="Signature" className="ml-auto h-10 w-24 object-contain mix-blend-multiply bg-white rounded border border-slate-100 p-1" />
              )}
            </div>
          )}
        </div>

        {/* Payment Area — only shown once signed */}
        {isSigned && (
          <div className={`rounded-3xl p-6 shadow-sm space-y-5 border ${isAcomptePaid ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
            {isAcomptePaid ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-black text-emerald-800">Acompte payé ✓</p>
                  <p className="text-emerald-600 text-xs mt-0.5">
                    {devis.acompteAmount?.toLocaleString('fr-FR')} € reçus — Votre réservation est confirmée !
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} className="text-brand-900" />
                    <h3 className="text-lg font-black text-slate-900">Étape 2 — Sécurisez votre réservation</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Pour confirmer définitivement votre déménagement, réglez votre acompte de {ACOMPTE_PERCENT}% en ligne par carte bancaire. Le solde sera réglé le jour J.
                  </p>
                </div>

                {/* Acompte recap */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-100">
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-slate-500">Total devis</span>
                    <span className="font-bold">{devis.price?.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-slate-500">Acompte ({ACOMPTE_PERCENT}%)</span>
                    <span className="font-black text-brand-900 text-base">{acompteAmount.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-slate-500">Solde à régler le jour du déménagement</span>
                    <span className="font-bold">{(devis.price! - acompteAmount).toLocaleString('fr-FR')} €</span>
                  </div>
                </div>

                {paymentError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-semibold flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    {paymentError}
                  </div>
                )}

                <button
                  type="button"
                  disabled={paymentLoading}
                  onClick={handlePayAcompte}
                  className="w-full bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white rounded-2xl px-6 py-4 font-black text-base flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
                >
                  {paymentLoading ? (
                    <><Loader2 size={20} className="animate-spin" /> Redirection vers le paiement...</>
                  ) : (
                    <><CreditCard size={20} /> Payer {acompteAmount.toLocaleString('fr-FR')} € par carte</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <Lock size={12} />
                  <span>Paiement 100% sécurisé par <strong>Stripe</strong> · Visa, Mastercard, CB acceptés</span>
                </div>
              </>
            )}
          </div>
        )}

      </main>

      <footer className="mt-auto pt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        © 2026 Marne Transdem · Tous droits réservés
      </footer>
    </div>
  );
}
