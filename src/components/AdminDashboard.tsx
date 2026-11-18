import React, { useState, useMemo } from 'react';
import { WhatsAppGroup, GroupCategory } from '../types';
import { isValidWhatsAppInviteLink } from '../lib/storage';
import { isSupabaseConfigured } from '../lib/supabase';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Power,
  PowerOff,
  ExternalLink,
  RotateCcw,
  LogOut,
  Database,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code2,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';

interface AdminDashboardProps {
  groups: WhatsAppGroup[];
  onAddGroup: () => void;
  onEditGroup: (group: WhatsAppGroup) => void;
  onDeleteGroup: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetDefaults: () => void;
  onLogout: () => void;
  onBackToHome: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  groups,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
  onToggleStatus,
  onResetDefaults,
  onLogout,
  onBackToHome,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'groups' | 'database'>('groups');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Statistics
  const totalCount = groups.length;
  const activeCount = groups.filter((g) => g.status === 'active').length;
  const inactiveCount = groups.filter((g) => g.status === 'inactive').length;
  const prodiCount = groups.filter((g) => g.category === 'prodi').length;
  const daerahCount = groups.filter((g) => g.category === 'ut_daerah').length;

  // Filtered groups
  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchSearch =
        group.group_name.toLowerCase().includes(search.toLowerCase()) ||
        group.study_program.toLowerCase().includes(search.toLowerCase()) ||
        group.faculty.toLowerCase().includes(search.toLowerCase()) ||
        group.whatsapp_link.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === 'all' || group.category === categoryFilter;

      const matchStatus =
        statusFilter === 'all' || group.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [groups, search, categoryFilter, statusFilter]);

  const handleDelete = (id: string) => {
    onDeleteGroup(id);
    setDeleteConfirmId(null);
    onShowToast('Grup berhasil dihapus', undefined, 'info');
  };

  const sqlSchemaText = `-- Tabel WhatsApp Groups untuk Supabase
CREATE TABLE IF NOT EXISTS public.whatsapp_groups (
    id TEXT PRIMARY KEY,
    group_name TEXT NOT NULL,
    study_program TEXT NOT NULL,
    faculty TEXT DEFAULT 'Umum',
    category TEXT NOT NULL CHECK (category IN ('prodi', 'ut_daerah', 'umum', 'angkatan', 'artikel_ilmiah')),
    education_level TEXT DEFAULT 'Semua Jenjang',
    description TEXT,
    purpose TEXT,
    rules JSONB DEFAULT '[]'::jsonb,
    whatsapp_link TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    order_priority INTEGER DEFAULT 100,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.whatsapp_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active groups" 
ON public.whatsapp_groups FOR SELECT 
USING (status = 'active');`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchemaText);
    setCopiedSql(true);
    onShowToast('SQL Schema berhasil disalin ke clipboard');
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Bar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToHome}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Kembali ke Beranda"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-950 flex items-center gap-2">
                  <span>Dashboard Administrator</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    Terproteksi
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kelola direktori grup WhatsApp, tautan, dan status aktif
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddGroup}
              className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Tambah Grup</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-full border border-slate-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Keluar dari sesi admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Total Grup Tersedia</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Seluruh database</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-emerald-600 font-semibold">Status Aktif</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{activeCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Tampil untuk pengunjung</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-400 font-semibold">Status Nonaktif</div>
            <div className="text-2xl font-black text-slate-500 mt-1">{inactiveCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Disembunyikan sementara</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-blue-600 font-semibold">Program Studi / UT Daerah</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{prodiCount + daerahCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{prodiCount} Prodi &bull; {daerahCount} Daerah</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'groups'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar & Manajemen Grup ({filteredGroups.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Koneksi Supabase & Skema</span>
            {isSupabaseConfigured ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>
        </div>

        {activeTab === 'groups' ? (
          /* Table Section */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama grup, prodi, atau tautan..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium outline-hidden focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="prodi">Prodi</option>
                  <option value="ut_daerah">UT Daerah</option>
                  <option value="umum">Umum</option>
                  <option value="angkatan">Angkatan</option>
                  <option value="artikel_ilmiah">Artikel Ilmiah</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>

                <button
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin me-reset seluruh grup ke data awal bawaan?')) {
                      onResetDefaults();
                      onShowToast('Database berhasil di-reset ke data bawaan');
                    }
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                  title="Kembalikan semua grup ke daftar awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset Awal</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Urutan</th>
                    <th className="py-3 px-4">Nama Grup</th>
                    <th className="py-3 px-4">Kategori & Prodi</th>
                    <th className="py-3 px-4">Tautan WhatsApp</th>
                    <th className="py-3 px-4">Anggota</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGroups.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-400">
                        Tidak ada grup yang cocok dengan filter atau pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredGroups.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-400 font-semibold">
                          #{g.order_priority}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-1.5">
                            <span>{g.group_name}</span>
                            {g.is_new && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-50 text-rose-600 border border-rose-200 font-extrabold uppercase">
                                Baru
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800 capitalize">
                            {g.category.replace('_', ' ')}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                            {g.study_program}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs">
                          <a
                            href={g.whatsapp_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 truncate max-w-[200px]"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600 shrink-0" />
                            <span className="truncate">{g.whatsapp_link.replace('https://chat.whatsapp.com/', '')}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                          </a>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-600">
                          ± {g.member_count}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => onToggleStatus(g.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                              g.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {g.status === 'active' ? (
                              <>
                                <Power className="w-3 h-3 text-emerald-600" />
                                <span>Aktif</span>
                              </>
                            ) : (
                              <>
                                <PowerOff className="w-3 h-3 text-slate-400" />
                                <span>Nonaktif</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onEditGroup(g)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Ubah Grup"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(g.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Hapus Grup"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* Database Supabase Integration Tab */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>Integrasi Supabase Database</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Aplikasi ini siap dihubungkan langsung ke akun Supabase Anda dengan tabel <code className="font-mono text-emerald-700 font-bold">whatsapp_groups</code>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Supabase Terhubung</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Mode LocalStorage (Offline Ready)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Instruction Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
              <h4 className="font-bold text-slate-900">Cara Menghubungkan Supabase:</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                <li>Buka Dashboard Supabase di <strong>app.supabase.com</strong> dan buat project baru.</li>
                <li>Masuk ke menu <strong>SQL Editor</strong>, lalu salin dan jalankan skrip SQL di bawah ini.</li>
                <li>Buat file <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">.env</code> di root project dan tambahkan:
                  <pre className="mt-2 p-2.5 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
                    VITE_SUPABASE_URL=https://your-project.supabase.co{'\n'}
                    VITE_SUPABASE_ANON_KEY=your-anon-key-here
                  </pre>
                </li>
                <li>Website akan otomatis beralih dari penyimpanan lokal ke Supabase PostgreSQL secara real-time!</li>
              </ol>
            </div>

            {/* SQL Script block */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span>Skrip SQL Pembuatan Tabel & RLS</span>
                </span>
                <button
                  onClick={copySql}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Tersalin' : 'Salin Skrip SQL'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {sqlSchemaText}
              </pre>
            </div>

          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Hapus Grup WhatsApp?</h3>
            <p className="text-xs text-slate-500">
              Grup yang dihapus tidak akan ditampilkan lagi kepada pengguna. Tindakan ini dapat dibatalkan dengan fitur reset.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

