import { useCallback, useEffect, useState } from "react";
import { questService } from "../services/questService";
import type { NewQuest, Quest } from "../types/quest";

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "An unexpected quest error occurred.";
}

/**
 * Loads quests and exposes service-backed quest operations to React components.
 *
 * Returns:
 * - `quests`: the current quest list for rendering or selection.
 * - `isLoading`: whether the initial quest load is in progress.
 * - `error`: the latest load or mutation error message, or `null` when there is none.
 * - `refresh`: reloads the list from the service.
 * - `createQuest`: validates and creates a quest through the service, then adds it to the list.
 * - `updateQuest`: validates and updates a quest through the service, then replaces it in the list.
 * - `deleteQuest`: deletes a quest through the service, then removes it from the list.
 */
export function useQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setQuests(await questService.getAll());
            setError(null);
        } catch (loadError) {
            setError(getErrorMessage(loadError));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isCurrent = true;

        questService.getAll()
            .then((loadedQuests) => {
                if (isCurrent) {
                    setQuests(loadedQuests);
                    setError(null);
                }
            })
            .catch((loadError: unknown) => {
                if (isCurrent) {
                    setError(getErrorMessage(loadError));
                }
            })
            .finally(() => {
                if (isCurrent) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    const createQuest = useCallback(async (quest: NewQuest) => {
        setError(null);
        try {
            const createdQuest = await questService.create(quest);
            setQuests((currentQuests) => [createdQuest, ...currentQuests]);
            return createdQuest;
        } catch (createError) {
            setError(getErrorMessage(createError));
            throw createError;
        }
    }, []);

    const updateQuest = useCallback(async (quest: Quest) => {
        setError(null);
        try {
            const updatedQuest = await questService.update(quest);
            setQuests((currentQuests) =>
                currentQuests.map((currentQuest) =>
                    currentQuest.id === updatedQuest.id ? updatedQuest : currentQuest,
                ),
            );
            return updatedQuest;
        } catch (updateError) {
            setError(getErrorMessage(updateError));
            throw updateError;
        }
    }, []);

    const deleteQuest = useCallback(async (id: number) => {
        setError(null);
        try {
            await questService.delete(id);
            setQuests((currentQuests) =>
                currentQuests.filter((quest) => quest.id !== id),
            );
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
            throw deleteError;
        }
    }, []);

    return {
        quests,
        isLoading,
        error,
        refresh,
        createQuest,
        updateQuest,
        deleteQuest,
    };
}
