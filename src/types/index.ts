export type GroupCategory = 
  | 'prodi'
  | 'ut_daerah'
  | 'umum'
  | 'angkatan'
  | 'artikel_ilmiah';

export type EducationLevel = 'Semua Jenjang' | 'S1' | 'S2' | 'Diploma';

export interface WhatsAppGroup {
  id: string;
  group_name: string;
  study_program: string;
  faculty: string;
  category: GroupCategory;
  education_level: EducationLevel;
  description: string;
  purpose: string;
  rules: string[];
  whatsapp_link: string;
  member_count: number;
  status: 'active' | 'inactive';
  order_priority: number;
  is_featured?: boolean;
  is_new?: boolean;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  faculty: string;
  educationLevel: string;
  sortBy: 'name-asc' | 'name-desc' | 'popular' | 'newest';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

