import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bpvjtftxvdwuxaiutktg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdmp0ZnR4dmR3dXhhaXV0a3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NjkwNzMsImV4cCI6MjAzMDA0NTA3M30.hz7bU42EDPN1c9DvEhMqK8BuV2L7jOxVzG5H7l7-OoI';

export const supabase = createClient(supabaseUrl, supabaseKey);