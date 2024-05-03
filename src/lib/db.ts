import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';

const connectionString = 'postgres://postgres.bpvjtftxvdwuxaiutktg:MaranathaResources@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);