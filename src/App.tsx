import React, { useState, useEffect, useMemo } from 'react';
import { WhatsAppGroup, FilterOptions, ToastMessage } from './types';
import { GroupService } from './lib/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterSection } from './components/FilterSection';
import { GroupListItem } from './components/GroupListItem';
import { GroupDetailModal } from './components/GroupDetailModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

export function App() {
  const [groups, setGroups] = useState<WhatsAppGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDetailGroup, setSelectedDetailGroup] = useState<WhatsAppGroup | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Filter & Search states
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    faculty: 'all',
    educationLevel: 'all',
    sortBy: 'name-asc',
  });

  // Load data on mount
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const data = await GroupService.fetchAll();
      setGroups(data);
      setIsLoading(false);
    };
    init();
  }, []);

  // Toast Helper
  const showToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filtered and sorted groups for public view
  const publicFilteredGroups = useMemo(() => {
    return groups
      .filter((g) => g.status === 'active')
      .filter((g) => {
        // Category filter
        if (filters.category !== 'all' && g.category !== filters.category) {
          return false;
        }

        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchName = g.group_name.toLowerCase().includes(q);
          const matchProdi = g.study_program.toLowerCase().includes(q);
          const matchFaculty = g.faculty.toLowerCase().includes(q);
          const matchDesc = g.description.toLowerCase().includes(q);
          if (!matchName && !matchProdi && !matchFaculty && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'name-asc') {
          return a.group_name.localeCompare(b.group_name, 'id');
        }
        if (filters.sortBy === 'name-desc') {
          return b.group_name.localeCompare(a.group_name, 'id');
        }
        if (filters.sortBy === 'popular') {
          return (b.member_count || 0) - (a.member_count || 0);
        }
        if (filters.sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return (a.order_priority || 0) - (b.order_priority || 0);
      });
  }, [groups, filters]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      faculty: 'all',
      educationLevel: 'all',
      sortBy: 'name-asc',
    });
  };

  // Group copy link handler
  const handleCopyLink = (link: string, groupName: string) => {
    showToast(
      'Tautan Berhasil Disalin',
      `Link grup "${groupName}" siap dibagikan.`
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-slate-900 selection:bg-emerald-500 selection:text-white antialiased">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Clean Navbar - NO LOGIN */}
      <Navbar
        totalGroupsCount={groups.filter((g) => g.status === 'active').length}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('daftar-grup');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        totalGroupsCount={groups.filter((g) => g.status === 'active').length}
      />

      {/* Directory Section matching grups.mhsut.com */}
      <section id="daftar-grup" className="scroll-mt-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6">
          
          {/* Section Header */}
          <div className="mx-auto mb-8 max-w-lg text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Direktori Grup WhatsApp Universitas Terbuka
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              Temukan Grup Kuliah Kamu
            </h2>
            <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
              Kumpulan tautan grup WhatsApp mahasiswa Universitas Terbuka (UT) terlengkap per program studi, UPBJJ daerah, angkatan, dan artikel ilmiah.
            </p>
          </div>

          {/* Directory Content Container (max-w-3xl) */}
          <div className="mx-auto w-full max-w-3xl">
            
            {/* Filter & Search Bar */}
            <FilterSection
              filters={filters}
              setFilters={setFilters}
              totalResults={publicFilteredGroups.length}
              onReset={handleResetFilters}
            />

            {/* List Content */}
            <div className="mt-4">
              {isLoading ? (
                <div className="flex min-h-48 flex-col items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                  <p className="mt-3 text-sm text-slate-400">Memuat grup...</p>
                </div>
              ) : publicFilteredGroups.length > 0 ? (
                <div className="space-y-2.5">
                  {publicFilteredGroups.map((group) => (
                    <GroupListItem
                      key={group.id}
                      group={group}
                      onSelectDetail={(g) => setSelectedDetailGroup(g)}
                      onCopyLink={handleCopyLink}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-14 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-800">
                    Grup tidak ditemukan
                  </p>
                  <p className="mx-auto max-w-xs text-xs text-slate-400 leading-relaxed">
                    Coba gunakan kata kunci atau pilih kategori lain.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition cursor-pointer"
                  >
                    Reset pencarian
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Clean Footer - NO LOGIN */}
      <Footer />

      {/* Group Detail Modal */}
      <GroupDetailModal
        group={selectedDetailGroup}
        onClose={() => setSelectedDetailGroup(null)}
        onCopyLink={handleCopyLink}
      />
    </main>
  );
}

export default App;
