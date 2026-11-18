import React, { useState } from 'react';
import { WhatsAppGroup } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ChevronRight, Copy, Check, Info, Sparkles } from 'lucide-react';

interface GroupListItemProps {
  group: WhatsAppGroup;
  onSelectDetail: (group: WhatsAppGroup) => void;
  onCopyLink: (link: string, groupName: string) => void;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({
  group,
  onSelectDetail,
  onCopyLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(group.whatsapp_link);
    setCopied(true);
    onCopyLink(group.whatsapp_link, group.group_name);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectDetail(group);
  };

  const getCategoryLabel = () => {
    switch (group.category) {
      case 'prodi':
        return 'Program Studi';
      case 'ut_daerah':
        return 'UT Daerah';
      case 'angkatan':
        return 'Angkatan';
      case 'artikel_ilmiah':
        return 'Artikel Ilmiah (ARIL)';
      case 'umum':
      default:
        return 'Komunitas Umum';
    }
  };

  return (
    <div className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-slate-50 hover:bg-slate-100/90 transition-all active:scale-[0.99] p-3.5 sm:p-4 border border-slate-100 hover:border-slate-200">
      
      {/* Clickable Area: Opens WhatsApp link */}
      <a
        href={group.whatsapp_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 min-w-0 flex-1 text-left"
        title={`Gabung grup ${group.group_name} di WhatsApp`}
      >
        {/* Universitas Terbuka Logo Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200/90 p-1 group-hover:scale-105 group-hover:border-emerald-300 transition-all overflow-hidden shadow-2xs">
          <img
            src="/logo-ut.jpg"
            alt="Universitas Terbuka"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Text Container with generous line-heights */}
        <div className="min-w-0 flex-1 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors break-words">
              {group.group_name}
            </h3>
            {group.is_new && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 leading-none">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Baru</span>
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-slate-500 leading-normal break-words">
            {group.faculty || group.study_program} &bull; {getCategoryLabel()}
          </p>
        </div>
      </a>

      {/* Right Actions */}
      <div className="flex items-center gap-1 shrink-0">
        
        {/* Info/Rules Button */}
        <button
          type="button"
          onClick={handleOpenDetail}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          title="Lihat informasi dan aturan grup"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
          title="Salin tautan WhatsApp"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        {/* Direct WhatsApp Join Pill */}
        <a
          href={group.whatsapp_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-[#25D366] hover:bg-[#20c45e] text-white px-3 py-1.5 text-xs font-semibold shadow-2xs transition active:scale-[0.98]"
          title="Buka di WhatsApp"
        >
          <span>Gabung</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>

      </div>

    </div>
  );
};
