export type RssItem = {
  title: string;
  link?: string;
  publishedAt?: string;
  source?: string;
};

function decodeXml(s: string) {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function pickTag(xml: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m?.[1]?.trim();
}

function stripCdata(s: string) {
  const trimmed = s.trim();
  if (trimmed.startsWith('<![CDATA[') && trimmed.endsWith(']]>')) {
    return trimmed.slice('<![CDATA['.length, -3).trim();
  }
  return trimmed;
}

export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const itemXml = m[1] ?? '';
    const title = pickTag(itemXml, 'title');
    if (!title) continue;
    const link = pickTag(itemXml, 'link');
    const pubDate = pickTag(itemXml, 'pubDate');
    items.push({
      title: decodeXml(stripCdata(title)),
      link: link ? decodeXml(stripCdata(link)) : undefined,
      publishedAt: pubDate ? decodeXml(stripCdata(pubDate)) : undefined,
    });
  }
  return items;
}

