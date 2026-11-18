import { useState, useSyncExternalStore } from "react";
import * as adventurerService from "../services/adventurerService";
import type { AdventurerInput } from "../types/adventurer";

export function useAdventurers() {
    useSyncExternalStore(
        adventurerService.subscribe,
        adventurerService.getVersion
    );

    const adventurers = adventurerService.getAdventurers();
    const [error, setError] = useState("");

    function runAction(action: () => void): boolean {
        try {
            action();
            setError("");

            return true;
        } catch (cause) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Unable to update adventurers."
            );

            return false;
        }
    }

    function addAdventurer(input: AdventurerInput): boolean {
        return runAction(() =>
            adventurerService.createAdventurer(input)
        );
    }

    function updateAdventurer(
        id: number,
        input: AdventurerInput
    ): boolean {
        return runAction(() =>
            adventurerService.updateAdventurer(id, input)
        );
    }

    function removeAdventurer(id: number): boolean {
        return runAction(() =>
            adventurerService.deleteAdventurer(id)
        );
    }

    return {
        adventurers,
        error,
        addAdventurer,
        updateAdventurer,
        removeAdventurer,
    };
}