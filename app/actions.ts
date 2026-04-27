'use server'
import { fetchUrl, insertUrl, UrlShortener } from "./src/services/database";

export const shortenUrl = async (url: string): Promise<UrlShortener> => {
    const shortLink = crypto.randomUUID().slice(0, 8);
    const short = insertUrl(url, shortLink);

    return short
  }

export const getShortenUrls = async(): Promise<UrlShortener[]> => {
    return fetchUrl();
  }
