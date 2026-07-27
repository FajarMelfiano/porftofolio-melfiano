import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file: File, folder: string = 'general'): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from('portfolio-files')
      .upload(filePath, file);

    if (error) {
      console.error('Supabase upload error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('portfolio-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (e) {
    console.error('Upload exception:', e);
    return null;
  }
};

export const deleteFile = async (fileUrl: string): Promise<boolean> => {
  try {
    if (!fileUrl.includes('supabase.co')) return true; // not our file

    const urlObj = new URL(fileUrl);
    const pathSegments = urlObj.pathname.split('/portfolio-files/');
    if (pathSegments.length < 2) return false;
    
    const filePath = decodeURIComponent(pathSegments[1]);

    const { error } = await supabase.storage
      .from('portfolio-files')
      .remove([filePath]);

    return !error;
  } catch (e) {
    console.error('Delete exception:', e);
    return false;
  }
};
