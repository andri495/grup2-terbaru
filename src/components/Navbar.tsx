import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Search } from 'lucide-react';

interface NavbarProps {
  totalGroupsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ totalGroupsCount }) => {
  const scrollToSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('daftar-grup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9fb]/95 backdrop-blur-md border-b border-slate-200/60 transition-all">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo & Name with Universitas Terbuka Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group"
          aria-label="Pusat Informasi Grup WhatsApp Universitas Terbuka"
        >
          {/* UT Logo Container with WhatsApp Corner Accent */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 p-1 shadow-2xs group-hover:border-emerald-300 transition-colors">
            <img
              src="/logo-ut.jpg"
              alt="Logo Universitas Terbuka"
              className="h-full w-full object-contain"
            />
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] ring-1.5 ring-white shadow-xs">
              <WhatsAppIcon className="h-2.5 w-2.5 fill-white" />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight">
              Pusat Informasi Grup WhatsApp
            </p>
            <p className="text-xs text-slate-500 leading-tight mt-0.5">
              <span className="font-semibold text-emerald-700">Universitas Terbuka</span> &bull; {totalGroupsCount} Grup Aktif
            </p>
          </div>
        </a>

        {/* Right Action: "Cari Grup" */}
        <div className="flex items-center shrink-0">
          <a
            href="#daftar-grup"
            onClick={scrollToSearch}
            className="flex h-9 items-center gap-1.5 rounded-full bg-slate-900 px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-[0.98]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cari Grup</span>
          </a>
        </div>

      </div>
    </header>
  );
};
