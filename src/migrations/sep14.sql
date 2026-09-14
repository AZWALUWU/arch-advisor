-- Buat ekstensi UUID jika belum aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel Utama Menyimpan Evaluasi Arsitektur
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    project_description TEXT NOT NULL,
    form_inputs JSONB NOT NULL,
    ai_output JSONB NOT NULL,
    cost_estimate JSONB NOT NULL,
    waf_scores JSONB NOT NULL,
    is_public BOOLEAN DEFAULT TRUE NOT NULL
);

-- Indexing untuk pencarian cepat berdasarkan ID
CREATE INDEX IF NOT EXISTS idx_evaluations_created_at ON public.evaluations(created_at DESC);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja bisa membaca data jika is_public = true (untuk Shareable Link)
CREATE POLICY "Public evaluations are readable by anyone" 
ON public.evaluations 
FOR SELECT 
USING (is_public = true);

-- Policy: Izinkan insert anonim untuk menyimpan hasil form
CREATE POLICY "Anyone can insert evaluations" 
ON public.evaluations 
FOR INSERT 
WITH CHECK (true);