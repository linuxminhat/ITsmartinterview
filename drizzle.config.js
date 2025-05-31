

/** @type { import("drizzle-kit").Config } */
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Load environment variables from .env.local file
const DB_PATH = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;


export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_4MKYkrB8lQPj@ep-red-tree-a1pujjgj-pooler.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require',
  },
};
