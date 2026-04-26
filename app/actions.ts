'use server'

export interface UrlShortener {
  url: string;
  short: string;
}

const shortenedUrls: UrlShortener[]= []

export const shortenUrl = async (url: string): Promise<UrlShortener> => {
    const shortLink = crypto.randomUUID();
    const short: UrlShortener = {url: url, short: shortLink};
    shortenedUrls.push(short);

    return short
  }

export const getShortenUrls = async(): Promise<UrlShortener[]> => {
    return shortenedUrls
  }