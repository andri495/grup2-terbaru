import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NotFoundProps {
  onBackToHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
          <WhatsAppIcon className="w-10 h-10 fill-emerald-600" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-slate-900 tracking-tight block">
            404
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Maaf, halaman atau grup WhatsApp yang Anda cari tidak tersedia atau tautan telah berpindah alamat.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            onClick={onBackToHome}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda Utama</span>
          </button>
        </div>

      </div>
    </div>
  );
};

