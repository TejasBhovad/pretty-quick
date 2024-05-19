import "dotenv/config";

export default {
  schema: "./db/schema.js",
  out: "./drizzle",
  // driver: "pg",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_NEON_DATABASE_URL,
  },
  dialect: "postgresql",
};
