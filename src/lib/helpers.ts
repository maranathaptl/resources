import { supabase } from '$lib/supabase';

export function handleLinkTarget(link: string) {
  const isLinkExternal = !link.startsWith('/') && !link.startsWith('#');
  return isLinkExternal ? '_blank' : '_self';
}

export function handleVariants(variants?: string|null) {
  if(!variants) return '';
  const v: string[] = [];
  variants.split(' ').map((type) => {
    v.push(`is-${type}`);
  });
  return ' ' + v.join(' ');
}

export function toArray<T>(value: T|T[]): T[] {
  return Array.isArray(value) ? value : Array.prototype.slice.call(value);
}

export async function getLyricsUrl(id?: number) {
  if (!id) return '';
  const { data } = await supabase.from('lyrics').select().eq('id', id).maybeSingle();
  return `/lyrics/${ data.title.toLowerCase().replaceAll(' ', '-') }--${ id }`;
}

export async function getSheetMusicUrl(id?: number) {
  if (!id) return '';
  const { data } = await supabase.from('sheet_music').select().eq('id', id).maybeSingle();
  return `/sheet-music/${ data.slug }`;
}