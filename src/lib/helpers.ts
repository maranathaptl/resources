export function handleLinkTarget(link: string) {
  const isLinkExternal = !link.startsWith('/') || !link.startsWith('#');
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