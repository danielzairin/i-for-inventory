## Description

This project is a kickstart to an Inventory Management System, prioritizing simplicity and minimal dependencies.
## Motivation

The goal of this project was to build a Inventory Management System in roughly a single day.

To stay productive both in the short term and longer term, I use tools that are minimal and focused on reducing complexity:

- NextJS, React server components and server actions, over managing state client-side.
- Hono and serverless architecture, over standalone JSON APIs and servers.
- SQLite and Turso, over self-managed databases.

## Quick Start

The application is deployed live [here](https://nextjs-inventory-management.vercel.app/auth/login).

Login with the demo account:

- **Username:** `alpha`
- **Password**: `alpha`

You can find other demo accounts with different permissions [here](https://nextjs-inventory-management.vercel.app/demo-accounts).

## Contributing

To run the application locally, you will need the following installed on your machine:

- Node.js with a **minimum version of 18.17**

### Clone the repository and install dependencies

```
git clone https://github.com/danielzairin/nextjs-inventory-management.git
cd nextjs-inventory-management/
npm install
```

### Copy the example .env file

```
cp .env.example .env
```

### Create the SQLite database and seed some data

```
npx drizzle-kit push:sqlite
npx tsx scripts/seed-db.ts
```

### Run the tests, check that everything works

```
npx vitest
```

### Start the dev server and code away!

```
npm run dev
```
