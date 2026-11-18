import React from 'react';
import { BookOpen, MapPin, Calendar, FileText, CheckCircle } from 'lucide-react';
import { WhatsAppGroup } from '../types';

interface StatsBarProps {
  groups: WhatsAppGroup[];
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  groups,
  onSelectCategory,
  activeCategory,
}) => {
  const prodiCount = groups.filter((g) => g.category === 'prodi').length;
  const daerahCount = groups.filter((g) => g.category === 'ut_daerah').length;
  const angkatanCount = groups.filter((g) => g.category === 'angkatan').length;
  const arilCount = groups.filter((g) => g.category === 'artikel_ilmiah').length;
  const umumCount = groups.filter((g) => g.category === 'umum').length;

  const stats = [
    {
      id: 'prodi',
      label: 'Program Studi',
      count: prodiCount,
      icon: BookOpen,
      desc: 'Manajemen, Ilkom, Hukum, SI, PGSD, dll.',
      accent: 'border-blue-200 hover:border-blue-300 bg-blue-50/40 text-blue-700',
    },
    {
      id: 'ut_daerah',
      label: 'UT Daerah',
      count: daerahCount,
      icon: MapPin,
      desc: 'Jakarta, Bandung, Surabaya, Luar Negeri, dll.',
      accent: 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/40 text-emerald-700',
    },
    {
      id: 'angkatan',
      label: 'Angkatan',
      count: angkatanCount,
      icon: Calendar,
      desc: '2023 sd 2026 Ganjil & Genap',
      accent: 'border-purple-200 hover:border-purple-300 bg-purple-50/40 text-purple-700',
    },
    {
      id: 'artikel_ilmiah',
      label: 'Artikel Ilmiah (ARIL)',
      count: arilCount,
      icon: FileText,
      desc: 'Bimbingan Karil & Publikasi Mahasiswa',
      accent: 'border-amber-200 hover:border-amber-300 bg-amber-50/40 text-amber-700',
    },
  ];

  return (
    <div className="py-6 border-y border-slate-200/80 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            const isSelected = activeCategory === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : s.id)}
                className={`p-4 rounded-2xl border text-left transition-all group active:scale-98 ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 bg-emerald-50/70 border-emerald-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.accent} transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {s.count}
                  </span>
                </div>
                <div className="mt-2.5">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{s.label}</span>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

