import { adventurerRepo } from "../repositories/adventurerRepo";
import type { AdventurerInput } from "../types/adventurer";
import type { ValidationResult } from "../types/validation";


export function validateInput(
    value: string,
    field: "name" | "characterClass"
): ValidationResult {
    const errors: string[] = [];

    if (!value.trim()) {
        errors.push(
            field === "name"
                ? "Name is required."
                : "Character class is required."
        );
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

function prepareInput(input: AdventurerInput): AdventurerInput {
    const errors = [
        ...validateInput(input.name, "name").errors,
        ...validateInput(input.characterClass, "characterClass").errors,
    ];

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    return {
        name: input.name.trim(),
        characterClass: input.characterClass.trim(),
    };
}

export function getAdventurers() {
    return adventurerRepo.getAll();
}

export function getAdventurerById(id: number) {
    return adventurerRepo.getById(id);
}

export function createAdventurer(input: AdventurerInput) {
    return adventurerRepo.create(prepareInput(input));
}

export function updateAdventurer(
    id: number,
    input: AdventurerInput
) {
    return adventurerRepo.update(id, prepareInput(input));
}

export function deleteAdventurer(id: number) {
    adventurerRepo.remove(id);
}

export function subscribe(listener: () => void) {
    return adventurerRepo.subscribe(listener);
}

export function getVersion() {
    return adventurerRepo.getVersion();
}