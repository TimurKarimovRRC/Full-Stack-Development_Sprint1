# Quest Architecture

This document covers the quest board and submission flow.

## Quest type and seed data

- **What:** `src/types/quest.ts` defines `Quest`, `QuestDifficulty`, and
  `NewQuest`. `src/data/quests.ts` provides 30 typed sample quests.
- **Why:** Shared types keep the quest structure consistent. Seed data lets
  the repository provide records without depending on a backend.
- **Where:** The quest repository, service, and hooks use the types. The
  repository initializes its in-memory records from the seed data.

## Repository

### `src/repositories/questRepository.ts`

- **What:** Implements quest create, read, update, and delete operations using
  in-memory data. It returns copies and reports duplicate or missing IDs.
- **Why:** The repository owns data access, so its source can later be replaced
  without moving storage logic into the UI.
- **Where:** `questService` calls the repository; components reach it through
  the service and `useQuests`.

## Service

### `src/services/questService.ts`

- **What:** Applies quest rules: trims and validates fields, checks
  difficulty, generates IDs, and validates IDs for update and delete.
- **Why:** Business rules belong outside the UI and data-access layer.
- **Where:** `useQuests` calls the service for quest operations.

## Hooks

### `src/hooks/useQuests.ts`

- **What:** Connects React state to the quest service. It returns:
  - `quests` — records to render.
  - `isLoading` — initial-load status for loading UI and submission control.
  - `error` — the latest load or mutation error.
  - `refresh` — reloads quests.
  - `createQuest`, `updateQuest`, `deleteQuest` — perform service operations
    and update this hook instance's local list.
- **Why:** Keeps React state and service calls out of components while
  leaving business rules in the service.
- **Where:** `QuestBoards` uses the list and loading/error state.
  `QuestSubmission` creates quests and displays loading/error state.

### `src/hooks/useForm.ts`

- **What:** Manages string-valued form presentation state. It returns:
  - `values` — current field values, keyed by input name.
  - `handleChange` — updates a named input, select, or textarea.
  - `reset` — restores the initial values.
- **Why:** Reuses UI-only form behavior without taking on quest business rules
  or data access.
- **Where:** `QuestSubmission` uses these values to control and reset its form.

## Components

### `src/components/Quests/Quests.tsx`

- **What:** Displays quests and loading or error feedback.
- **Why:** Uses `useQuests` rather than receiving quest data through `App`.
- **Where:** Rendered by the `/quests` route.

### `src/components/QuestSubmission/QuestSubmission.tsx`

- **What:** Displays the quest form and submission feedback.
- **Why:** Uses `useForm` for fields and `useQuests` to submit through the
  service and repository.
- **Where:** Rendered by the `/quest-submission` route.
