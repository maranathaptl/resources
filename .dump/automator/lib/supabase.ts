import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://bpvjtftxvdwuxaiutktg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdmp0ZnR4dmR3dXhhaXV0a3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NjkwNzMsImV4cCI6MjAzMDA0NTA3M30.hz7bU42EDPN1c9DvEhMqK8BuV2L7jOxVzG5H7l7-OoI'
);

export const sheetMusic = {
  async all() {
    const { data, error } = await supabase.from('sheet_music').select('*');
    if (error) throw error;
    return data;
  }
}