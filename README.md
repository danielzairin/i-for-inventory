## Overview

This project is a kickstart to an Inventory Management System, prioritizing simplicity and minimal dependencies. Built with Next.js + Hono and deployed on Vercel, it offers essential features for tracking inventory and updating products.

## Demo

The app _should_ be live at https://nextjs-inventory-management.vercel.app

## Development

Initialize the SQLite database and seed some data.

- Make sure you have a .env file too.
- You can copy the existing .env.example file and it will work for local development.

```
npx drizzle-kit push:sqlite
npx tsx scripts/seed-db.ts
```

Run the tests, check everything works.

```
npx vitest
```

Install and start the dev server.

```
npm install
npm run dev
```

## Technologies Used

- NextJS app directory + React v18's new "server" capabilities
- Hono to keep the backend APIs portable
- SQLite, drizzle-orm and turso
