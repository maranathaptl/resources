import { supabase } from './lib/supabase';
import { parseXml } from '../../src/lib/xmlParser';
import { DOMParser } from 'xmldom';

export async function fromFilesToDb() {
  const { data } = await supabase.storage.from('lyrics').list('', {
    offset: 0,
    limit: 2000,
    sortBy: { column: 'name', order: 'asc' },
  });

  const files = data?.filter((file) => file.name !== '.emptyFolderPlaceholder').map(async (file) => {
    const url = supabase.storage.from('lyrics').getPublicUrl(file.name);
    return {
      publicUrl: url.data.publicUrl
    };
  });

  function parseTitle(title: string): string {
    return title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  files?.forEach((item) => {
    item.then(async (res) => {
      const lyricData = await parseXml(res.publicUrl);
      const getLyricsFromDb = await supabase
        .from('lyrics')
        .select()
        .eq('file', res.publicUrl);

      if (getLyricsFromDb.data?.length == 0) {
        const insertLyricsToDb = await supabase.from('lyrics').insert({
          title: parseTitle(lyricData.header[0].title),
          artist: parseTitle(lyricData.header[0].author),
          file: res.publicUrl
        });
        console.log(`DONE: ${ parseTitle(lyricData.header[0].title) } - ${ parseTitle(lyricData.header[0].author) }`);
      }
    });
  });
}

export async function addSearchTermsToDb() {
  /*const { data } = await supabase
    .from('lyrics')
    .select();

  if (data) {
    for (const item of data) {
      const fileData = await parseXml(item.file);
      const searchTerms: (string | undefined)[] = [];

      fileData.results.forEach((item: { header: string; content: string; }) => {
        const parser = new DOMParser().parseFromString(item.content, "text/xml");
        searchTerms.push(parser.getElementsByTagName('lines')[0].textContent?.toLowerCase());
      });

      const updateTable = await supabase
        .from('lyrics')
        .update({ search_terms: searchTerms.join(' ') })
        .eq('id', item.id);
      console.log(`UPDATE DONE: ${ item.title }`);
    }
  }*/
}