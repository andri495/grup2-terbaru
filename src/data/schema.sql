-- ========================================================
-- DATABASE SCHEMA: PUSAT INFORMASI GRUP WHATSAPP
-- Compatible with Supabase PostgreSQL
-- ========================================================

-- 1. Create table whatsapp_groups
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

-- 2. Create index for fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_whatsapp_groups_category ON public.whatsapp_groups(category);
CREATE INDEX IF NOT EXISTS idx_whatsapp_groups_status ON public.whatsapp_groups(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_groups_order ON public.whatsapp_groups(order_priority ASC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_groups_name ON public.whatsapp_groups(group_name);

-- 3. Row Level Security (RLS)
ALTER TABLE public.whatsapp_groups ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active groups
CREATE POLICY "Public can view active whatsapp groups" 
ON public.whatsapp_groups 
FOR SELECT 
USING (status = 'active' OR auth.role() = 'authenticated');

-- Allow authenticated users (Admin) full access
CREATE POLICY "Authenticated users can manage groups" 
ON public.whatsapp_groups 
FOR ALL 
USING (auth.role() = 'authenticated');

-- 4. Trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_whatsapp_groups_updated_at
BEFORE UPDATE ON public.whatsapp_groups
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

