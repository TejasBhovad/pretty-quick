# Pretty Quick Todo List

Simple todo list built using DrizzleORM, Postgres, and NextJS, with authentication implemented using AuthJS(formerly known as NextAuth).

> Blazingly fast todo list with under 100ms response times

![Pretty Quick Todo List](/github/home.jpeg)

# Features

- Create, Read, Update, and Delete tasks
- User authentication with Google
- Caching content
- Vercel edge functions for serverless functions

# Installation

1. Clone the repo
2. Install dependencies with `pnpm install`
3. Create a `.env` file in the root of the project and add the following:

```bash
NEXT_PUBLIC_NEON_DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_DRIZZLE_URL=
```

4. Run the project with `pnpm dev`
5. Visit `http://localhost:3000` in your browser

# Important Commands

### Generate Schema

```bash
 pnpm drizzle-kit generate:pg
```

### Push Schema

```bash
pnpm drizzle-kit push:pg
```

### Drizzle Studio

```bash
pnpm drizzle-kit studio
```

### Notes on Drizzle ORM

you cant use serial with update table in PG, drop the tables and create them again

```sql
DROP TABLE <name>
```

# License

[MIT](/License.md)

Thsi repository serves as a template for creating a basic web app using Neon tech's Postgres DB in NextJS. It includes user authentication with Google and caching content. The app is deployed on Vercel with serverless functions.
