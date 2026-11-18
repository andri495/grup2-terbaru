import React, { useState } from 'react';
import { WhatsAppGroup } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Copy, Check, ExternalLink, Info, Users, Sparkles, MapPin, GraduationCap, BookOpen, Calendar, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroupCardProps {
  group: WhatsAppGroup;
  onSelectDetail: (group: WhatsAppGroup) => void;
  onCopyLink: (link: string, groupName: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onSelectDetail,
  onCopyLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(group.whatsapp_link);
    setCopied(true);
    onCopyLink(group.whatsapp_link, group.group_name);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Confetti effect on joining
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      // ignore
    }
    window.open(group.whatsapp_link, '_blank', 'noopener,noreferrer');
  };

  const getCategoryBadge = () => {
    switch (group.category) {
      case 'prodi':
        return {
          label: 'Program Studi',
          icon: BookOpen,
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
        };
      case 'ut_daerah':
        return {
          label: 'UT Daerah',
          icon: MapPin,
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        };
      case 'angkatan':
        return {
          label: 'Angkatan',
          icon: Calendar,
          badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
        };
      case 'artikel_ilmiah':
        return {
          label: 'Artikel Ilmiah',
          icon: FileText,
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
        };
      case 'umum':
      default:
        return {
          label: 'Komunitas Umum',
          icon: Users,
          badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
        };
    }
  };

  const cat = getCategoryBadge();
  const CategoryIcon = cat.icon;

  return (
    <div
      onClick={() => onSelectDetail(group)}
      className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Meta Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border ${cat.badgeClass}`}
            >
              <CategoryIcon className="w-3 h-3" />
              <span>{cat.label}</span>
            </span>

            {/* Level Badge if available */}
            {group.education_level && group.education_level !== 'Semua Jenjang' && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                {group.education_level}
              </span>
            )}

            {/* Is New Badge */}
            {group.is_new && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200 uppercase tracking-wider animate-pulse">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Baru</span>
              </span>
            )}
          </div>

          {/* Quick Copy Button */}
          <button
            onClick={handleCopy}
            title="Salin tautan WhatsApp"
            className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Group Name */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 leading-snug">
          {group.group_name}
        </h3>

        {/* Prodi / Faculty Subtitle */}
        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium line-clamp-1">
          <span>{group.faculty || group.study_program}</span>
        </div>

        {/* Description Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {group.description || 'Grup diskusi akademik mahasiswa resmi untuk koordinasi belajar dan informasi perkuliahan.'}
        </p>

        {/* Member count tag */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>± {group.member_count} Mahasiswa</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 group-hover:underline flex items-center gap-0.5">
            <Info className="w-3 h-3" />
            <span>Detail & Aturan</span>
          </span>
        </div>

      </div>

      {/* Action Footer: WhatsApp Direct Join Button */}
      <div className="mt-4 pt-1">
        <button
          onClick={handleJoin}
          className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group/btn"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white shrink-0 group-hover/btn:scale-110 transition-transform" />
          <span>Gabung Grup WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/80 shrink-0 ml-0.5" />
        </button>
      </div>

    </div>
  );
};

