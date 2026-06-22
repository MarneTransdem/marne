import React, { useMemo, useState } from 'react';
import { useSyncedCollection } from '../../hooks/useData';
import type { Demenagement, FieldTruck, Devis } from '../../types';
import { 
  TrendingUp, Truck, MapPin, ShieldCheck, BarChart3, 
  PieChart, Activity, Info, Calendar, ArrowUpRight, CheckCircle2
} from 'lucide-react';

export function AdminAnalytics() {
  const [demenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [trucks] = useSyncedCollection<FieldTruck>('trucks');
  const [devisList] = useSyncedCollection<Devis>('devis');

  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '12m' | 'all'>('6m');

  const monthNamesFr = [
    'Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
  ];

  // Helper pour formater l'affichage des mois (ex: "2026-06" -> "Juin 2026")
  const formatMonthKey = (key: string) => {
    const [year, month] = key.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNamesFr[monthIndex]} ${year}`;
  };

  // --- 1. Filtrage et Agrégation des données ---
  const stats = useMemo(() => {
    // Trier tous les chantiers par date
    const sortedMoves = [...demenagements].sort((a, b) => a.date.localeCompare(b.date));

    // Déterminer la période de filtrage
    let filteredMoves = sortedMoves;
    if (selectedPeriod !== 'all') {
      const monthsToKeep = selectedPeriod === '6m' ? 6 : 12;
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - monthsToKeep);
      const cutoffStr = cutoffDate.toISOString().split('T')[0].substring(0, 7); // YYYY-MM
      filteredMoves = sortedMoves.filter(m => m.date.substring(0, 7) >= cutoffStr);
    }

    // A. VOLUME MENSUEL DÉPLACÉ
    const volumeByMonth: Record<string, number> = {};
    const countByMonth: Record<string, number> = {};
    
    filteredMoves.forEach(m => {
      const monthKey = m.date.substring(0, 7); // "YYYY-MM"
      if (monthKey) {
        volumeByMonth[monthKey] = (volumeByMonth[monthKey] || 0) + m.volume;
        countByMonth[monthKey] = (countByMonth[monthKey] || 0) + 1;
      }
    });

    const monthlyVolumeArray = Object.keys(volumeByMonth).map(key => ({
      key,
      label: formatMonthKey(key),
      volume: volumeByMonth[key],
      courses: countByMonth[key]
    })).sort((a, b) => a.key.localeCompare(b.key));

    // B. TAUX DE REMPLISSAGE MOYEN DES CAMIONS
    let totalFillRateSum = 0;
    let fillRateCount = 0;
    const truckStats: Record<string, { totalVolume: number; totalCapacity: number; count: number; fillRateSum: number }> = {};

    filteredMoves.forEach(m => {
      if (m.assignedTruck) {
        // Retrouver la capacité du camion dans la collection
        const truck = trucks.find(t => t.plateNumber === m.assignedTruck);
        const capacity = truck?.capacity || 20; // 20m3 par défaut si non trouvé

        const fillRate = (m.volume / capacity) * 100;
        const cappedFillRate = Math.min(fillRate, 100); // Plafonné à 100%

        totalFillRateSum += cappedFillRate;
        fillRateCount++;

        if (!truckStats[m.assignedTruck]) {
          truckStats[m.assignedTruck] = { totalVolume: 0, totalCapacity: 0, count: 0, fillRateSum: 0 };
        }
        truckStats[m.assignedTruck].totalVolume += m.volume;
        truckStats[m.assignedTruck].totalCapacity += capacity;
        truckStats[m.assignedTruck].count += 1;
        truckStats[m.assignedTruck].fillRateSum += cappedFillRate;
      }
    });

    const globalAverageFillRate = fillRateCount > 0 ? Math.round(totalFillRateSum / fillRateCount) : 0;

    const truckStatsArray = Object.keys(truckStats).map(plate => {
      const ts = truckStats[plate];
      const truckDetail = trucks.find(t => t.plateNumber === plate);
      return {
        plate,
        type: truckDetail?.type || 'Fourgon',
        capacity: truckDetail?.capacity || 20,
        count: ts.count,
        avgFillRate: Math.round(ts.fillRateSum / ts.count),
        totalVolume: ts.totalVolume
      };
    }).sort((a, b) => b.avgFillRate - a.avgFillRate);

    // C. RÉPARTITION GÉOGRAPHIQUE (VILLES TOP DESTINATIONS)
    const geoCount: Record<string, { count: number; volume: number }> = {};
    filteredMoves.forEach(m => {
      const city = m.toCity ? m.toCity.split('(')[0].trim() : 'Inconnu';
      if (!geoCount[city]) {
        geoCount[city] = { count: 0, volume: 0 };
      }
      geoCount[city].count += 1;
      geoCount[city].volume += m.volume;
    });

    const geoStatsArray = Object.keys(geoCount).map(city => ({
      city,
      count: geoCount[city].count,
      volume: geoCount[city].volume
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    // D. STATISTIQUES DE SIGNATURE
    const terminatedMoves = filteredMoves.filter(m => m.status === 'Terminé');
    const signedMoves = terminatedMoves.filter(m => !!m.clientSignature);
    const signatureRate = terminatedMoves.length > 0 ? Math.round((signedMoves.length / terminatedMoves.length) * 100) : 0;

    // Métriques globales pour affichage
    const totalVolumeMoved = filteredMoves.reduce((sum, m) => sum + m.volume, 0);
    const totalCoursesCount = filteredMoves.length;

    return {
      monthlyVolumes: monthlyVolumeArray,
      globalAverageFillRate,
      truckStats: truckStatsArray,
      geoStats: geoStatsArray,
      terminatedMovesCount: terminatedMoves.length,
      signedMovesCount: signedMoves.length,
      signatureRate,
      totalVolumeMoved,
      totalCoursesCount
    };
  }, [demenagements, trucks, selectedPeriod]);

  // Déterminer la valeur maximale pour l'échelle du graphique de volume
  const maxVolumeVal = useMemo(() => {
    const max = Math.max(...stats.monthlyVolumes.map(mv => mv.volume), 0);
    return max > 0 ? Math.ceil(max / 100) * 100 : 200; // Arrondir au 100 supérieur
  }, [stats.monthlyVolumes]);

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em] bg-accent/10 px-2.5 py-1 rounded-full block">Analyses de Flotte</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-brand-900 dark:text-white">
            Tableau de Bord Analytique
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            Indicateurs clés d'exploitation, de logistique et d'activité terrain de Marne Transdem.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800 self-start sm:self-center">
          <button
            onClick={() => setSelectedPeriod('6m')}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              selectedPeriod === '6m' 
                ? 'bg-accent text-brand-900 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            6 Mois
          </button>
          <button
            onClick={() => setSelectedPeriod('12m')}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              selectedPeriod === '12m' 
                ? 'bg-accent text-brand-900 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            12 Mois
          </button>
          <button
            onClick={() => setSelectedPeriod('all')}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              selectedPeriod === 'all' 
                ? 'bg-accent text-brand-900 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Tout
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume total déplacé</span>
            <div className="p-2.5 bg-brand-50 dark:bg-brand-950/20 rounded-xl">
              <TrendingUp className="text-brand-700 dark:text-brand-300" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">
            {stats.totalVolumeMoved.toLocaleString('fr-FR')} m³
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">
            Somme cumulée sur {stats.totalCoursesCount} déménagements.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Remplissage Flotte</span>
            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/20 rounded-xl">
              <Truck className="text-sky-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">
            {stats.globalAverageFillRate}%
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">
            Optimisation moyenne de la capacité de transport.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taux de signature</span>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
              <ShieldCheck className="text-emerald-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">
            {stats.signatureRate}%
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">
            {stats.signedMovesCount} décharges signées sur {stats.terminatedMovesCount} livrés.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Moyenne mensuelle</span>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
              <Activity className="text-indigo-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">
            {stats.monthlyVolumes.length > 0 
              ? Math.round(stats.totalVolumeMoved / stats.monthlyVolumes.length).toLocaleString('fr-FR')
              : 0} m³
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">
            Volume moyen déplacé par mois de service.
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Volume Monthly & Geo list */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Monthly Volume SVG Bar Chart */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-slate-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Volume mensuel déplacé (m³)</h3>
              </div>
              <span className="text-[9px] font-black uppercase text-accent tracking-widest">Graphique Vectoriel</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="w-full">
              {stats.monthlyVolumes.length === 0 ? (
                <div className="h-60 flex flex-col items-center justify-center text-slate-400 text-xs font-light italic">
                  Aucun chantier planifié sur cette période.
                </div>
              ) : (
                <div className="relative">
                  <svg className="w-full h-auto" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                      const yVal = 180 - ratio * 140;
                      return (
                        <g key={idx}>
                          <line x1="40" y1={yVal} x2="480" y2={yVal} stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" strokeWidth="0.5" />
                          <text x="32" y={yVal + 3} fill="#94a3b8" fontSize="7" fontWeight="bold" textAnchor="end">
                            {Math.round(ratio * maxVolumeVal)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Bars Rendering */}
                    {stats.monthlyVolumes.map((mv, idx) => {
                      const totalBars = stats.monthlyVolumes.length;
                      const spacing = totalBars > 6 ? 12 : 28;
                      const barWidth = totalBars > 6 ? 24 : 36;
                      const startX = 40 + (440 - (totalBars * (barWidth + spacing) - spacing)) / 2;
                      const x = startX + idx * (barWidth + spacing);
                      
                      const barHeight = maxVolumeVal > 0 ? (mv.volume / maxVolumeVal) * 140 : 0;
                      const y = 180 - barHeight;

                      return (
                        <g key={mv.key} className="group">
                          {/* Main Bar */}
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="4"
                            fill="url(#barGradient)"
                            className="transition-all duration-300 hover:fill-accent hover:opacity-90"
                          />
                          
                          {/* Inner/Invisible wide rect for easier hover */}
                          <rect
                            x={x - spacing / 2}
                            y="20"
                            width={barWidth + spacing}
                            height="170"
                            fill="transparent"
                            className="cursor-pointer"
                          />

                          {/* Hover Tooltip Value */}
                          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <rect
                              x={x + barWidth / 2 - 25}
                              y={y - 18}
                              width="50"
                              height="12"
                              rx="3"
                              fill="#0f172a"
                            />
                            <text
                              x={x + barWidth / 2}
                              y={y - 10}
                              fill="#ffffff"
                              fontSize="6.5"
                              fontWeight="black"
                              textAnchor="middle"
                            >
                              {mv.volume} m³
                            </text>
                          </g>

                          {/* Month Label */}
                          <text
                            x={x + barWidth / 2}
                            y="198"
                            fill="#64748b"
                            fontSize="7"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="dark:fill-slate-400"
                          >
                            {mv.label.split(' ')[0]}
                          </text>
                          <text
                            x={x + barWidth / 2}
                            y="208"
                            fill="#94a3b8"
                            fontSize="6"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="dark:fill-slate-500"
                          >
                            {mv.label.split(' ')[1]}
                          </text>
                        </g>
                      );
                    })}

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d97706" /> {/* Brand Amber */}
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Geo Distribution list */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={16} className="text-slate-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                Top 5 des destinations de livraison
              </h3>
            </div>

            <div className="space-y-4">
              {stats.geoStats.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Aucune donnée géographique disponible.</p>
              ) : (
                stats.geoStats.map((geo, idx) => {
                  const maxCount = Math.max(...stats.geoStats.map(g => g.count), 1);
                  const widthPercent = Math.round((geo.count / maxCount) * 100);

                  return (
                    <div key={geo.city} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-[10px] font-black rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-850 dark:text-slate-100">{geo.city}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold">
                          <span>{geo.volume} m³ déplacés</span>
                          <span className="text-brand-900 dark:text-white font-black">{geo.count} chantier{geo.count > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      {/* Progress bar container */}
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/60 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Fleet Efficiency Radial & Signatures Donut */}
        <div className="space-y-8">
          
          {/* Radial Fill Rate Gauge */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[320px]">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Truck size={14} className="text-slate-400" />
                Optimisation de flotte
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                Taux de remplissage moyen de l'ensemble de la flotte de camions.
              </p>
            </div>

            {/* Radial progress ring */}
            <div className="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100 dark:stroke-slate-950"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-amber-500"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - stats.globalAverageFillRate / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center space-y-0.5">
                <span className="text-2xl font-black text-brand-900 dark:text-white block">
                  {stats.globalAverageFillRate}%
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                  Efficacité
                </span>
              </div>
            </div>

            {/* Micro warning indicator */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-3 flex gap-2.5 items-start">
              <Info size={14} className="text-sky-500 mt-0.5 shrink-0" />
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                Un taux optimal se situe entre 70% et 90%. En deçà, les véhicules voyagent à vide. Au-delà, risque de dépassement de charge volumétrique.
              </p>
            </div>
          </div>

          {/* Truck specific rates */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Activity size={14} className="text-slate-400" />
              Taux par Véhicule
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
              {stats.truckStats.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2 text-center">Aucune affectation camion disponible.</p>
              ) : (
                stats.truckStats.map(ts => (
                  <div key={ts.plate} className="flex items-center justify-between pt-3 first:pt-0 gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-black text-brand-950 dark:text-white truncate">{ts.plate}</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-0.5">
                        {ts.type} · {ts.capacity} m³ · {ts.count} mission{ts.count > 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    {/* Fill rate badge */}
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0 ${
                      ts.avgFillRate >= 80 
                        ? 'bg-emerald-50 border border-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/30' 
                        : ts.avgFillRate >= 60
                        ? 'bg-amber-50 border border-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/30'
                        : 'bg-red-50 border border-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/30'
                    }`}>
                      {ts.avgFillRate}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Signature rate card */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} className="text-slate-400" />
              Taux d'Émargement
            </h3>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-950"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeWidth="3.5"
                    strokeDasharray={`${stats.signatureRate}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                  {stats.signatureRate}%
                </div>
              </div>

              <div className="min-w-0 text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {stats.signedMovesCount} décharges finalisées
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Sur les {stats.terminatedMovesCount} chantiers déclarés livrés dans le CRM sur cette période.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
