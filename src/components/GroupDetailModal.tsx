import React, { useState } from 'react';
import { WhatsAppGroup } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Copy, Check, ExternalLink, ShieldCheck, Target, Users, BookOpen, MapPin, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroupDetailModalProps {
  group: WhatsAppGroup | null;
  onClose: () => void;
  onCopyLink: (link: string, groupName: string) => void;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  onClose,
  onCopyLink,
}) => {
  const [copied, setCopied] = useState(false);

  if (!group) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(group.whatsapp_link);
    setCopied(true);
    onCopyLink(group.whatsapp_link, group.group_name);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // ignore
    }
    window.open(group.whatsapp_link, '_blank', 'noopener,noreferrer');
  };

  const getCategoryBadge = () => {
    switch (group.category) {
      case 'prodi':
        return { label: 'Program Studi', icon: BookOpen, color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'ut_daerah':
        return { label: 'UT Daerah', icon: MapPin, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'angkatan':
        return { label: 'Angkatan', icon: Calendar, color: 'text-purple-700 bg-purple-50 border-purple-200' };
      case 'artikel_ilmiah':
        return { label: 'Artikel Ilmiah (ARIL)', icon: FileText, color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'umum':
      default:
        return { label: 'Komunitas Umum', icon: Users, color: 'text-slate-700 bg-slate-100 border-slate-200' };
    }
  };

  const cat = getCategoryBadge();
  const CatIcon = cat.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-xl border border-slate-200 overflow-hidden transform transition-all my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              <img src="/logo-ut.jpg" alt="UT" className="h-3.5 w-auto object-contain" />
              <span>Universitas Terbuka &bull; {cat.label}</span>
            </span>
            {group.education_level && group.education_level !== 'Semua Jenjang' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                {group.education_level}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug pr-8">
            {group.group_name}
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-normal font-medium">
            {group.faculty || group.study_program}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold block leading-normal">Estimasi Anggota</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block leading-normal">± {group.member_count} Mahasiswa</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold block leading-normal">Status Komunitas</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-1 leading-normal">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Terverifikasi Aktif</span>
              </span>
            </div>
          </div>

          {/* Deskripsi Lengkap */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 leading-normal">
              Deskripsi Grup
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {group.description || 'Grup ini dibentuk untuk mempermudah komunikasi dan koordinasi antar mahasiswa.'}
            </p>
          </div>

          {/* Informasi Tujuan Grup */}
          {group.purpose && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 leading-normal">
                  Tujuan Grup
                </h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
                {group.purpose}
              </p>
            </div>
          )}

          {/* Aturan Grup */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 leading-normal">
                Aturan & Tata Tertib
              </h4>
            </div>
            <ul className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {group.rules && group.rules.length > 0 ? (
                group.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-600 leading-normal">
                  Patuhi etika kesopanan, hindari spam dan konten negatif.
                </li>
              )}
            </ul>
          </div>

          {/* Link Box */}
          <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <span className="truncate text-slate-500 font-mono text-[11px]">
              {group.whatsapp_link}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold shrink-0 shadow-2xs transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-white transition cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={handleJoin}
            className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20c45e] text-white font-semibold text-xs shadow-xs transition active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <img src="/logo-ut.jpg" alt="UT" className="h-4 w-auto rounded-full bg-white object-contain p-0.5 shrink-0" />
            <span>Gabung WhatsApp UT</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>

      </div>
    </div>
  );
};
