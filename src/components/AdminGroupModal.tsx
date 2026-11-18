import React, { useState, useEffect } from 'react';
import { WhatsAppGroup, GroupCategory, EducationLevel } from '../types';
import { isValidWhatsAppInviteLink } from '../lib/storage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, CheckCircle2, AlertTriangle, Link as LinkIcon, Info } from 'lucide-react';

interface AdminGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: WhatsAppGroup) => void;
  groupToEdit?: WhatsAppGroup | null;
}

export const AdminGroupModal: React.FC<AdminGroupModalProps> = ({
  isOpen,
  onClose,
  onSave,
  groupToEdit,
}) => {
  const [formData, setFormData] = useState<Partial<WhatsAppGroup>>({
    group_name: '',
    study_program: '',
    faculty: 'Fakultas Ekonomi dan Bisnis (FEB)',
    category: 'prodi',
    education_level: 'S1',
    description: '',
    purpose: '',
    rules: [
      'Gunakan bahasa yang sopan dan santun',
      'Dilarang menyebarkan hoaks, spam, atau iklan ilegal',
      'Saling membantu kegiatan perkuliahan'
    ],
    whatsapp_link: '',
    member_count: 100,
    status: 'active',
    order_priority: 50,
    is_featured: false,
    is_new: true,
  });

  const [rulesText, setRulesText] = useState('');
  const [linkError, setLinkError] = useState('');

  useEffect(() => {
    if (groupToEdit) {
      setFormData(groupToEdit);
      setRulesText((groupToEdit.rules || []).join('\n'));
    } else {
      setFormData({
        group_name: '',
        study_program: '',
        faculty: 'Fakultas Ekonomi dan Bisnis (FEB)',
        category: 'prodi',
        education_level: 'S1',
        description: '',
        purpose: '',
        rules: [
          'Gunakan bahasa yang sopan dan santun',
          'Dilarang menyebarkan hoaks, spam, atau iklan ilegal',
          'Saling membantu kegiatan perkuliahan'
        ],
        whatsapp_link: '',
        member_count: 150,
        status: 'active',
        order_priority: 50,
        is_featured: false,
        is_new: true,
      });
      setRulesText(
        'Gunakan bahasa yang sopan dan santun\nDilarang menyebarkan hoaks, spam, atau iklan ilegal\nSaling membantu kegiatan perkuliahan'
      );
    }
    setLinkError('');
  }, [groupToEdit, isOpen]);

  if (!isOpen) return null;

  const handleLinkChange = (url: string) => {
    setFormData((prev) => ({ ...prev, whatsapp_link: url }));
    if (url && !isValidWhatsAppInviteLink(url)) {
      setLinkError('Tautan harus berformat https://chat.whatsapp.com/[KodeUndangan]');
    } else {
      setLinkError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidWhatsAppInviteLink(formData.whatsapp_link || '')) {
      setLinkError('Format tautan WhatsApp tidak valid. Pastikan dimulai dengan https://chat.whatsapp.com/...');
      return;
    }

    const parsedRules = rulesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const completeGroup: WhatsAppGroup = {
      id: groupToEdit ? groupToEdit.id : `group-${Date.now()}`,
      group_name: formData.group_name || 'Grup WhatsApp Baru',
      study_program: formData.study_program || 'Umum',
      faculty: formData.faculty || 'Umum',
      category: (formData.category || 'prodi') as GroupCategory,
      education_level: (formData.education_level || 'Semua Jenjang') as EducationLevel,
      description: formData.description || '',
      purpose: formData.purpose || '',
      rules: parsedRules.length > 0 ? parsedRules : ['Gunakan etika komunikasi yang baik'],
      whatsapp_link: (formData.whatsapp_link || '').trim(),
      member_count: Number(formData.member_count) || 10,
      status: formData.status || 'active',
      order_priority: Number(formData.order_priority) || 100,
      is_featured: Boolean(formData.is_featured),
      is_new: Boolean(formData.is_new),
      created_at: groupToEdit ? groupToEdit.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(completeGroup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-slide-up my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <WhatsAppIcon className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {groupToEdit ? 'Ubah Informasi Grup' : 'Tambah Grup WhatsApp Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Lengkapi rincian grup dan tautan undangan resmi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Group Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Nama Grup WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.group_name || ''}
              onChange={(e) => setFormData({ ...formData, group_name: e.target.value })}
              placeholder="Contoh: MANAJEMEN 27.1, Mahasiswa UT Surabaya"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm font-semibold text-slate-900 outline-hidden"
            />
          </div>

          {/* Category & Education Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as GroupCategory })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="prodi">Program Studi</option>
                <option value="ut_daerah">UT Daerah</option>
                <option value="umum">Umum & CAMABA</option>
                <option value="angkatan">Angkatan</option>
                <option value="artikel_ilmiah">Artikel Ilmiah (ARIL)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Jenjang Pendidikan
              </label>
              <select
                value={formData.education_level}
                onChange={(e) =>
                  setFormData({ ...formData, education_level: e.target.value as EducationLevel })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="Semua Jenjang">Semua Jenjang</option>
                <option value="S1">Strata 1 (S1)</option>
                <option value="Diploma">Diploma (D3/D4)</option>
                <option value="S2">Magister (S2)</option>
              </select>
            </div>
          </div>

          {/* Study Program & Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Program Studi / Subjek
              </label>
              <input
                type="text"
                value={formData.study_program || ''}
                onChange={(e) => setFormData({ ...formData, study_program: e.target.value })}
                placeholder="Contoh: Manajemen, Sistem Informasi"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm font-medium text-slate-900 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Fakultas / UPBJJ Daerah
              </label>
              <input
                type="text"
                value={formData.faculty || ''}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                placeholder="Contoh: FEB, FST, UPBJJ-UT Jakarta"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm font-medium text-slate-900 outline-hidden"
              />
            </div>
          </div>

          {/* WhatsApp Link with Validation */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Link Undangan WhatsApp <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">Harus chat.whatsapp.com</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <input
                type="url"
                required
                value={formData.whatsapp_link || ''}
                onChange={(e) => handleLinkChange(e.target.value)}
                placeholder="https://chat.whatsapp.com/KodeUndanganGrup"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border text-sm font-mono text-slate-900 outline-hidden ${
                  linkError
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                    : 'border-slate-200 focus:border-emerald-500'
                }`}
              />
            </div>
            {linkError && (
              <p className="mt-1 text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{linkError}</span>
              </p>
            )}
          </div>

          {/* Members count & Order Priority & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Jumlah Anggota (±)
              </label>
              <input
                type="number"
                min="1"
                value={formData.member_count || 100}
                onChange={(e) =>
                  setFormData({ ...formData, member_count: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Urutan Tampilan
              </label>
              <input
                type="number"
                value={formData.order_priority || 50}
                onChange={(e) =>
                  setFormData({ ...formData, order_priority: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Status Grup
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="active">Aktif (Tampil)</option>
                <option value="inactive">Nonaktif (Sembunyikan)</option>
              </select>
            </div>
          </div>

          {/* Checkboxes for flags */}
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.is_new}
                onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Tandai sebagai Grup Baru</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Tandai Unggulan (Featured)</span>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Deskripsi Singkat Grup
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi kegiatan belajar dan informasi grup..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm text-slate-900 outline-hidden"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Tujuan Grup
            </label>
            <textarea
              rows={2}
              value={formData.purpose || ''}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Tujuan pembentukan grup..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm text-slate-900 outline-hidden"
            />
          </div>

          {/* Rules */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Aturan & Tata Tertib Komunitas
              </label>
              <span className="text-[11px] text-slate-400">Pisahkan setiap aturan dengan baris baru</span>
            </div>
            <textarea
              rows={3}
              value={rulesText}
              onChange={(e) => setRulesText(e.target.value)}
              placeholder="Aturan 1&#10;Aturan 2&#10;Aturan 3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm text-slate-900 outline-hidden font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{groupToEdit ? 'Simpan Perubahan' : 'Tambahkan Grup'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

