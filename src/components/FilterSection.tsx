import React from 'react';
import { Search, X, RotateCcw, ArrowUpDown } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterSectionProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  totalResults: number;
  onReset: () => void;
}

const CATEGORY_TABS: { id: string; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'prodi', label: 'Program Studi' },
  { id: 'ut_daerah', label: 'UT Daerah' },
  { id: 'umum', label: 'Umum & CAMABA' },
  { id: 'angkatan', label: 'Angkatan' },
  { id: 'artikel_ilmiah', label: 'Artikel Ilmiah' },
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
  totalResults,
  onReset,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Search Input Box */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
          }
          placeholder="Cari nama prodi, daerah, atau nama grup..."
          className="h-12 w-full rounded-2xl bg-slate-100 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 p-1 cursor-pointer"
            aria-label="Hapus pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 scrollbar-none">
        <div className="flex w-max gap-2 py-0.5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = filters.category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, category: tab.id }))}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition leading-normal cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter & Sorting Line */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <p className="leading-normal">
          <span className="font-semibold text-slate-800">{totalResults}</span> grup ditemukan
        </p>

        <div className="flex items-center gap-3">
          {/* Quick Sort Selector */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterOptions['sortBy'],
                }))
              }
              className="bg-transparent text-slate-700 font-medium text-xs outline-none cursor-pointer py-0.5"
            >
              <option value="name-asc">Nama (A-Z)</option>
              <option value="name-desc">Nama (Z-A)</option>
              <option value="popular">Anggota Terbanyak</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>

          {(filters.searchQuery || filters.category !== 'all') && (
            <button
              onClick={onReset}
              className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
