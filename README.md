Fantasy Quest Board

Project Team

Team name: QuestKeepers

Timur Karimov

Aum Mistry

MacKinley Wanless

Project General Description

Fantasy Quest Board aims to help adventurers discover quests and organize their adventures in a fantasy world. Users will be able to browse available quests, maintain a personal quest log, and track their progress.

High-Level User Stories

As an adventurer, I want to browse quests and see their descriptions, difficulty levels, and rewards, so that I can choose adventures that interest me.

As an adventurer, I want to sign in and save accepted quests to my personal quest log, so that I can return to my quests later.

As an adventurer, I want to update the status of my accepted quests, so that I can track my progress and completed adventures.


## Run the app locally

Use Node.js 24 with npm and Docker with Docker Compose.

On first setup, copy `apps/backend/.env.example` to `apps/backend/.env`.
The example connects to the local PostgreSQL database `questboard_dev`
on port `5433`, using the `public` schema.

From the project root, start PostgreSQL and install the dependencies:

```sh
docker compose up -d --wait postgres
npm ci
```

Generate the Prisma client, apply the migrations, and load the adventurers:

```sh
cd apps/backend
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

On an empty database, the seed adds 45 adventurers. Running it again adds 0.

Return to the project root and start both apps:

```sh
cd ../..
npm run dev
```

Open http://localhost:5173/adventurers to see the roster.
To check that the backend can read from PostgreSQL, open
http://localhost:3000/api/adventurers.