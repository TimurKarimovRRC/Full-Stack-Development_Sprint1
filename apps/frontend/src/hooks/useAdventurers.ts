import { useEffect, useState, useSyncExternalStore } from "react";
import * as adventurerService from "../services/adventurerService";
import type { AdventurerInput } from "../types/adventurer";

export function useAdventurers() {
    useSyncExternalStore(
        adventurerService.subscribe,
        adventurerService.getVersion
    );

const [ready, setReady] = useState(false);
const [error, setError] = useState("");
const adventurers = ready ? adventurerService.getAdventurers() : null;

useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    adventurerService.loadAdventurers(signal)
        .then(() => {
            if (!signal.aborted) setReady(true);
        })
        .catch((cause: unknown) => {
            if (!signal.aborted) {
                setError(cause instanceof Error ? cause.message : "Unable to load adventurers.");
            }
        });

    return () => controller.abort();
}, []);

async function runAction(action: () => Promise<unknown>): Promise<boolean> {
    try {
        await action();
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

function addAdventurer(input: AdventurerInput): Promise<boolean> {
    return runAction(() => adventurerService.createAdventurer(input));
}

function updateAdventurer(
    id: number,
    input: AdventurerInput
): Promise<boolean> {
    return runAction(() => adventurerService.updateAdventurer(id, input));
}

function removeAdventurer(id: number): Promise<boolean> {
    return runAction(() => adventurerService.deleteAdventurer(id));
}

    return {
        adventurers,
        error,
        addAdventurer,
        updateAdventurer,
        removeAdventurer,
    };
}