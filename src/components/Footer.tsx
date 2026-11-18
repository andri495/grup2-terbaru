import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-6 sm:px-6">
        
        {/* Clean container matching grups.mhsut.com */}
        <div className="rounded-2xl bg-[#f8f9fb] px-5 py-6 text-center space-y-2.5">
          
          <div className="flex items-center justify-center gap-2.5">
            <img
              src="/logo-ut.jpg"
              alt="Logo Universitas Terbuka"
              className="h-6 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-normal">
              Pusat Informasi Grup WhatsApp Universitas Terbuka
            </p>
          </div>

          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            Direktori resmi dan pusat informasi kumpulan link grup WhatsApp mahasiswa Universitas Terbuka (UT) di seluruh Indonesia dan Luar Negeri. Dikelola untuk mempermudah koordinasi belajar mandiri.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-400 leading-normal">
            <span>&copy; {new Date().getFullYear()} Komunitas Mahasiswa Universitas Terbuka</span>
            <span>&bull;</span>
            <a
              href="https://wa.me/?text=Halo%20Admin%20Pusat%20Informasi%20Grup%20WhatsApp%20Universitas%20Terbuka"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1 font-medium text-emerald-700"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>Bantuan Kontak Admin</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
