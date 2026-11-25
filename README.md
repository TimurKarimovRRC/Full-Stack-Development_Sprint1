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

From the project root (the folder with `apps`), install dependencies and start both apps:

```sh
npm ci
npm run dev
```

Open http://localhost:5173 to see the Quest Board. To check the backend, open
http://localhost:3000/health. It should return `{"status":"ok"}`.

### Start PostgreSQL

You can check `/health` without a database. If your branch has a `docker-compose.yml`
in the project root, start Docker and run these commands from that folder in a second terminal:

```sh
docker compose up -d
docker compose ps
```

Look for `Up` in the status column. PostgreSQL is available on `localhost:5433`.