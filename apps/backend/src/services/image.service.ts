import { minio, ensureBucket, nameToSlug } from '../utils/minio.util.js';
export async function fetchFilePosterImage(
  filePosterName: string,
): Promise<string | null> {
  const apiKey = process.env.OMDB_API_KEY ?? 'c9024e09';

  if (!apiKey) {
    console.error('OMDB_API_KEY is missing in process.env');
    return null;
  }

  // Encode the movie title for the URL search parameter
  const term = encodeURIComponent(filePosterName);

  try {
    // 1. Fetch data using title query parameter 't='
    const res = await fetch(
      `https://www.omdbapi.com/?t=${term}&apikey=${apiKey}`,
    );
    const data = (await res.json()) as {
      Response?: string;
      Poster?: string;
      Error?: string;
    };

    // 2. OMDb returns Response: "False" if the movie is not found
    if (data.Response === 'False' || !data.Poster) {
      return null;
    }

    // 3. OMDb returns "N/A" as a string if no poster is available
    if (data.Poster === 'N/A') {
      return null;
    }

    // 4. Return the poster image URL directly
    return data.Poster;
  } catch (error) {
    console.error('Error fetching poster from OMDb:', error);
    return null;
  }
}
export async function ensureFilePosterImage(name: string, bucketName: string) {
  await ensureBucket(bucketName);
  const fileName = `${nameToSlug(name)}.jpg`;
  try {
    await minio.statObject(bucketName, fileName);
    return fileName;
  } catch {
    //ignore
  }
  const posterImage = await fetchFilePosterImage(name);
  if (posterImage) {
    const imgRes = await fetch(posterImage);
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer());

    await minio.putObject(bucketName, fileName, imgBuffer, imgBuffer.length, {
      'Content-Type': 'image/jpeg',
    });
    return fileName;
  }
}
