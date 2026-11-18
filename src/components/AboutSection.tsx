import React from 'react';
import { ShieldCheck, Users, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>Tentang Platform Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Menghubungkan Ribuan Mahasiswa dalam Satu Ekosistem Belajar
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            <strong>PUSAT INFORMASI GRUP WHATSAPP</strong> hadir sebagai jembatan bagi seluruh mahasiswa baru, aktif, maupun alumni lintas program studi dan wilayah untuk saling berkolaborasi, berdiskusi, dan berbagi wawasan akademik secara langsung melalui media WhatsApp.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-14">
          
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Link Terkurasi & Aman</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Semua link undangan grup telah diverifikasi oleh tim pengelola komunitas untuk memastikan grup aktif, bebas dari spam, dan terhindar dari link phishing yang merugikan.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Struktur Komunitas Rapi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Daftar grup dikelompokkan secara terstruktur berdasarkan Program Studi, UPBJJ UT Daerah dari Sabang sampai Merauke hingga Luar Negeri, Angkatan, serta Bimbingan Karya Ilmiah.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Budaya Gotong Royong</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Membangun suasana kekeluargaan yang saling mendukung. Mahasiswa dapat saling bertanya tentang modul, tugas tutorial online (Tuton), jadwal ujian, hingga kelulusan.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

