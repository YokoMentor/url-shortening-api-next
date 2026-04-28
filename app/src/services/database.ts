import Database from "better-sqlite3";
import path from "path";

export const urlShortenerDB = new Database(
  path.join(process.cwd(), "db", "url-shortener.db"),
  { readonly: false, fileMustExist: true }
);

export interface UrlShortener {
  id: string;
  url: string;
  short: string;
}

export function insertUrl(url: string, short: string): UrlShortener {
    const id = crypto.randomUUID()
    const shortened: UrlShortener = {id: id, url: url, short: short};
    const query = "insert into URL_SHORTENER (id, url, short) values (?, ?, ?)"
    runQuery(urlShortenerDB, query, [shortened.id, shortened.url, shortened.short])
    return shortened;
}

export function fetchUrl(): UrlShortener[] {
    return fetchAll(urlShortenerDB, "select id, url, short from URL_SHORTENER", []) as UrlShortener[];
}

export function fetchOriginalUrl(short: string): string {
    const url = fetchFirst(urlShortenerDB, "select url from URL_SHORTENER where short = ?", [short]) as UrlShortener;
    return url.url
}

export function deleteUrl(short: string) {
  runQuery(urlShortenerDB, "delete from URL_SHORTENER where short = ?", [short]);
} 

export const fetchAll = (db: InstanceType<typeof Database>, sql: string, params: any[] = []) => {
  return db.prepare(sql).all(...params);
};

export const fetchFirst = (db: InstanceType<typeof Database>, sql: string, params: any[] = []) => {
  return db.prepare(sql).get(...params);
};

export const runQuery = (
  db: InstanceType<typeof Database>,
  sql: string,
  params: any[] = []
) => {
  return db.prepare(sql).run(...params);
};