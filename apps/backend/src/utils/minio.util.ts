import { Client } from 'minio';
export const minio = new Client({
  endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
  port: Number(process.env.MINIO_PORT ?? 9000),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ROOT_USER ?? 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD ?? 'minioadmin123',
});

export function createPublicPolicy(bucketName: string) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  });
}
export async function ensureBucket(bucketName: string): Promise<void> {
  const exists = await minio.bucketExists(bucketName);
  if (exists) return;
  if (!exists) await minio.makeBucket(bucketName);
  // Always (re-)apply — fixes buckets created before the policy was added
  await minio.setBucketPolicy(bucketName, createPublicPolicy(bucketName));
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}
export function publicUrl(bucket: string, object: string): string {
  const base = process.env.MINIO_PUBLIC_URL ?? 'http://localhost:9000';
  return `${base}/${bucket}/${object}`;
}
