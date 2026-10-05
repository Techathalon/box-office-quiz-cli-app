import 'dotenv/config';
import { PrismaClient } from '../../generated/prisma/client.js';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Create a native connection pool using your local database URL
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap it inside Prisma's driver adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma 7 client constructor
const prisma = new PrismaClient({ adapter });

export default prisma;
