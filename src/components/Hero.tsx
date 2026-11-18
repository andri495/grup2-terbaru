import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  totalGroupsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, totalGroupsCount }) => {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fb]">
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16">
        
        {/* Top badge pill with UT logo */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-xs border border-slate-200/80">
          <img
            src="/logo-ut.jpg"
            alt="Logo Universitas Terbuka"
            className="h-4 w-auto object-contain"
          />
          <span className="text-xs font-semibold text-slate-800 leading-normal">
            Komunitas Mahasiswa Universitas Terbuka
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-xs font-bold text-emerald-700">
            {totalGroupsCount} Grup
          </span>
        </div>

        {/* Headline with comfortable line-height so letters never collide */}
        <h1 className="mt-5 max-w-2xl text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-snug sm:leading-tight tracking-tight">
          Temukan Grup WhatsApp Mahasiswa Universitas Terbuka
        </h1>

        {/* Subtitle with explicit Universitas Terbuka mention */}
        <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
          Bergabunglah dengan komunitas mahasiswa Universitas Terbuka (UT) untuk mendapatkan informasi resmi perkuliahan, berdiskusi mata kuliah, berbagi modul & tugas, serta saling membantu dalam kegiatan belajar mandiri.
        </p>

        {/* CTA Button */}
        <a
          href="#daftar-grup"
          onClick={(e) => {
            e.preventDefault();
            onExploreClick();
          }}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-[#20c45e] active:scale-[0.98]"
        >
          <img src="/logo-ut.jpg" alt="UT" className="h-5 w-auto rounded-full bg-white object-contain p-0.5 shrink-0" />
          <span>Lihat Daftar Grup UT</span>
          <ArrowDown className="h-4 w-4 shrink-0" />
        </a>

      </div>
    </section>
  );
};
