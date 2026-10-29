# Sprint 3 Architecture — Timur Karimov

## Resource and Test Data

My resource is Adventurer.

The Adventurer type defines id, name, and characterClass.
AdventurerInput contains the editable name and characterClass fields.

The file src/data/adventurers.ts contains 45 typed test records.
Only adventurerRepo imports this array.

Records remain available across page navigation.
Reloading the browser restores the original test data.

## adventurerRepo

### What it does

Stores adventurer records in memory and provides CRUD methods:
getAll, getById, create, update, and remove.

It returns copies of records and generates numeric IDs.
Deleted IDs are not reused during the session.

### Why this logic belongs here

Loading, reading, and changing records are data access responsibilities.
The repository does not manage React state or validate form fields.

subscribe and getVersion provide data-change notifications.
They allow consumers to observe changes without depending on React.

### Where it is used

adventurerService calls the repository.
Components do not import the repository or test data directly.

## adventurerService

### What it does

Validates that name and characterClass contain non-whitespace text.
It trims these values before creating or updating a record.

It delegates reads, writes, and change notifications to the repository.

### Why this logic belongs here

Required fields and input normalization are business rules.
They must apply even when an operation is requested outside the form.

Storage remains in the repository.
Displaying errors remains in hooks and components.

### Where it is used

useAdventurers calls service methods to obtain and modify records.

AdventurersForm supplies service validation callbacks to useFormInput.

## useAdventurers

### What it does

Provides the current list and handlers for creating, updating,
and removing adventurers.

Returned values:

- adventurers: the current list to display.
- error: the latest action error for this hook instance.
- addAdventurer: requests creation and returns whether it succeeded.
- updateAdventurer: requests an update and returns whether it succeeded.
- removeAdventurer: requests deletion and returns whether it succeeded.

### Why this logic belongs here

Refreshing displayed data and showing action errors are presentation logic.

useSyncExternalStore observes the repository version through the service.
When data changes, subscribed components render the updated list.

The hook does not store the resource, generate IDs, or define business rules.

### Where it is used

Adventurers uses the hook to display and modify the roster.

QuestAssignmentPage uses the same hook to supply current adventurers
to QuestAssignmentForm and AssignmentList.

## useFormInput

### What it does

Manages one text input and its validation messages.

Returned values:

- value: the displayed input text.
- setValue: changes the text and clears previous messages.
- messages: validation errors to display.
- validate: runs a callback, stores errors, and returns its result.
- reset: restores the initial value and clears messages.

### Why this logic belongs here

Input values, displayed messages, and resetting fields are presentation logic.

Business rules are supplied through callbacks, so this hook can be reused
with other services and forms.

### Where it is used

AdventurersForm uses it for name and characterClass.

## Component Integration

Adventurers displays the roster and passes hook callbacks to its children.

AdventurersForm uses input hooks and service validation.
It clears the fields only after successful creation.

AdventurerCard displays one record and invokes its removal callback.

QuestAssignmentPage obtains adventurers through useAdventurers.
App no longer imports adventurer test data or passes it through routes.

## Scope

This contribution refactors the Adventurer resource.
Quest and Assignment resources remain separate team responsibilities.

The repository, service, and hook support updating records.
The current interface provides creation and removal.

Deleting an adventurer does not delete their assignments.
The assignment list displays Unknown adventurer for a missing record.