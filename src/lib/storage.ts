import { WhatsAppGroup } from '../types';
import { INITIAL_GROUPS } from '../data/initialGroups';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'pusat_informasi_wa_groups_v1';
const ADMIN_AUTH_KEY = 'pusat_informasi_wa_admin_auth';

// WhatsApp link validation helper
export function isValidWhatsAppInviteLink(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  // Valid format: https://chat.whatsapp.com/[InviteCode]
  const pattern = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9_-]{15,}$/;
  return pattern.test(trimmed);
}

// Local storage helpers
export function getLocalGroups(): WhatsAppGroup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GROUPS));
      return INITIAL_GROUPS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_GROUPS;
  } catch (err) {
    console.error('Error reading groups from localStorage:', err);
    return INITIAL_GROUPS;
  }
}

export function saveLocalGroups(groups: WhatsAppGroup[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  } catch (err) {
    console.error('Error writing groups to localStorage:', err);
  }
}

// Database / Repository service
export const GroupService = {
  async fetchAll(): Promise<WhatsAppGroup[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('whatsapp_groups')
          .select('*')
          .order('order_priority', { ascending: true });
        
        if (!error && data && data.length > 0) {
          return data as WhatsAppGroup[];
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage:', e);
      }
    }
    return getLocalGroups();
  },

  async upsert(group: WhatsAppGroup): Promise<{ success: boolean; group?: WhatsAppGroup; error?: string }> {
    if (!isValidWhatsAppInviteLink(group.whatsapp_link)) {
      return { 
        success: false, 
        error: 'Link harus berupa tautan undangan WhatsApp resmi yang valid (contoh: https://chat.whatsapp.com/KodeUnik)' 
      };
    }

    const now = new Date().toISOString();
    const updatedGroup: WhatsAppGroup = {
      ...group,
      updated_at: now,
      created_at: group.created_at || now,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('whatsapp_groups')
          .upsert(updatedGroup)
          .select()
          .single();
        if (error) throw error;
        if (data) {
          // also update local cache
          const local = getLocalGroups();
          const idx = local.findIndex(g => g.id === group.id);
          if (idx >= 0) local[idx] = data as WhatsAppGroup;
          else local.unshift(data as WhatsAppGroup);
          saveLocalGroups(local);
          return { success: true, group: data as WhatsAppGroup };
        }
      } catch (err: any) {
        console.warn('Supabase upsert failed, updating local only:', err);
      }
    }

    // Local storage persistence
    const local = getLocalGroups();
    const idx = local.findIndex(g => g.id === group.id);
    if (idx >= 0) {
      local[idx] = updatedGroup;
    } else {
      local.unshift(updatedGroup);
    }
    saveLocalGroups(local);
    return { success: true, group: updatedGroup };
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('whatsapp_groups').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    const local = getLocalGroups().filter(g => g.id !== id);
    saveLocalGroups(local);
    return true;
  },

  async toggleStatus(id: string): Promise<WhatsAppGroup | null> {
    const local = getLocalGroups();
    const target = local.find(g => g.id === id);
    if (!target) return null;

    const newStatus = target.status === 'active' ? 'inactive' : 'active';
    target.status = newStatus;
    target.updated_at = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('whatsapp_groups')
          .update({ status: newStatus, updated_at: target.updated_at })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase toggle error:', err);
      }
    }

    saveLocalGroups(local);
    return target;
  },

  resetDefaults(): WhatsAppGroup[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GROUPS));
    return INITIAL_GROUPS;
  }
};

// Admin authentication helpers
export const AdminAuthService = {
  isAuthenticated(): boolean {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  },

  login(password: string): boolean {
    // Default admin password for local/demo: "admin123" or "adminut2027"
    if (password === 'admin123' || password === 'adminut2027' || password === 'admin') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
};

