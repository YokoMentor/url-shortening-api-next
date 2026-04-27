 import { NextRequest } from "next/server";
import { fetchOriginalUrl } from "../../../src/services/database";
import { redirect } from "next/navigation";
 
 export async function GET(_req: NextRequest, {params} : { params : Promise<{shortUrl: string}>}) {
   const { shortUrl } = await params;
   const fetchResult = fetchOriginalUrl(shortUrl);
   redirect(fetchResult);
   return new Response(fetchResult) 
 }