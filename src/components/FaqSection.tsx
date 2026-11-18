import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Apakah bergabung ke dalam grup WhatsApp ini dipungut biaya?',
    answer: 'Sama sekali tidak. Seluruh grup yang terdaftar di Pusat Informasi Grup WhatsApp bersifat 100% gratis dan terbuka untuk seluruh mahasiswa tanpa dipungut biaya apapun.',
  },
  {
    question: 'Bagaimana jika kapasitas grup WhatsApp sudah penuh (1024 anggota)?',
    answer: 'Jika grup mencapai batas maksimal, Anda dapat memilih grup alternatif (seperti Grup 2) atau menghubungi admin pusat melalui menu Bantuan agar dibuatkan tautan grup cadangan yang baru.',
  },
  {
    question: 'Apakah boleh bergabung ke lebih dari satu grup WhatsApp?',
    answer: 'Tentu saja! Anda disarankan bergabung ke grup Program Studi Anda, grup UT Daerah domisili Anda, dan grup Angkatan Anda untuk mendapatkan informasi yang komprehensif.',
  },
  {
    question: 'Bagaimana cara menambahkan atau mendaftarkan link grup baru?',
    answer: 'Administrator dapat menambahkan grup baru secara langsung melalui Dashboard Admin. Jika Anda adalah koordinator kelas/daerah yang ingin mendaftarkan grup, silakan hubungi pengelola melalui kontak bantuan di footer.',
  },
  {
    question: 'Apa saja aturan dasar yang wajib ditaati di dalam grup?',
    answer: 'Setiap anggota wajib menjunjung etika kesopanan, dilarang menyebarkan hoaks, dilarang promosi judi online, pornografi, atau jasa joki akademik ilegal. Pelanggaran berat dapat mengakibatkan sanksi dikeluarkan dari grup.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="bantuan" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Bantuan & FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Temukan jawaban cepat seputar cara bergabung dan panduan komunitas
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-xl bg-slate-100 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

