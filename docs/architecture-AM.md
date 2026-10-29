# Quest Assignment Architecture

This feature uses a Hook-Service-Repository architecture to seprate concerns.

## The Layers

### 1. The UI Components (`QuestAssignmentPage`, `QuestAssignmentForm`, `AssignmentList`)

These components are only responsible for rendering the UI. They do not contain business logic or direct data access. They receive data and action functions like `addAssignment` from the Hook.

### 2. The Hook (`useAssignment.ts`)

This is the bridge between React and the data.

- It holds the React state (`assignment`, `quests`, `adventurers`, `isLoading`),
- It fetches iniital data when the component mounts.
- It provides actions (`addAssignment`, `removeAssignment`) that the UI can call.

### 3. The Service (`assignmentService.ts`)

This layer holds the **business logic**.

- Before any data is saved, the service validates it. For example, ensuring the adventurers, quest and due date are present.
- It generates the unquie ID for new assignments.
- It acts as a middleman between the Hook and the Repository.

### 4. The Repository (`assignmentRepository.ts`)

This layer is responsible for **data access**.

- It holds the mock array of assignments in memory.
- It provies basic CRUD operations (`getAll`, `create`, `update`, `delete`).
- In the future, this is the only file that will change when we connect to a real backend database.

## Data Flow Example: Adding an Assignment

1. User clicks "Assign Quest" in the Form.
2. The Form calls `addAssignment` (provided by the hook).
3. The Hook calls `assignmentService.createAssignment`.
4. The Service validates the data and generates an ID.
5. The Service calls `assignmentRepository.create`.
6. The Reposistory saves it to the array and returns the new object.
7. The Hook updates the React state with the new object.
8. The UI re-renders with the new assignment in the List.
