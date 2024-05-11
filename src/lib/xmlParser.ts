import { DOMParser } from 'xmldom';
import { toArray } from '$lib/helpers';

function filterContent(textContentArray: Array<NodeListOf<ChildNode>>): string {
  if (!textContentArray) return '';
  return textContentArray.join(' ').replaceAll('\'\\n      \'', '');
}

function parseHeader(header: string|null): string {
  if (!header) return '';
  const mapping: Record<string, string> = {
    'v': 'V',
    'c': 'CHO. ',
    'b': 'BRIDGE ',
    'p': 'PRE-CHO. ',
    'i': 'INTRO ',
    'e': 'ENDING ',
    'o': '',
  };
  return header.replace(/v|c/g, (match) => mapping[match]);
}

export async function parseXml(file: string) {
  let results: any = [];
  let header: any = [];

  await fetch(file)
    .then(res => res.text())
    .then(text => (new DOMParser()).parseFromString(text, "text/xml"))
    .then(d => {
      const title = d.getElementsByTagName('title');
      let author = d.getElementsByTagName('author');
      let theme = d.getElementsByTagName('theme');
      let lyrics = d.getElementsByTagName('verse');
      let items: Element[] = Array.prototype.slice.call(lyrics);
      header.push({
        title: title[0]?.textContent,
        author: author[0]?.textContent,
        theme: theme[0]?.textContent
      });

      items.forEach(async (item) => {
        results.push({
          header: parseHeader(item.getAttribute('name')),
          content: filterContent(toArray(item.childNodes))
        });
      });
    });
  return { header: header, results: results };
}