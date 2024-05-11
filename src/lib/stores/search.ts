import { writable } from 'svelte/store';

export function createSearchStore(data: any) {
  const { subscribe, set, update } = writable({
    data: data,
    filtered: data,
    search: ''
  });

  return { subscribe, set, update };
}

export function searchHandler(store: { search: string; filtered: any; data: any[]; }) {
  const searchTerm = store.search.toLowerCase() || '';
  store.filtered = store.data.filter((item) => {
    return item.searchTerms.toLowerCase().includes(searchTerm);
  });
}