import type { NewQuest, Quest } from "../types/quest";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

async function sendRequest(path: string, init?: RequestInit): Promise<Response> {
    const response = await fetch(`${apiBaseUrl}/api/quests${path}`, init);

    if (!response.ok) {
        let detail = response.statusText;
        try {
            const body: unknown = await response.json();
            if (
                typeof body === "object" &&
                body !== null &&
                "error" in body &&
                typeof body.error === "string"
            ) {
                detail = body.error;
            }
        } catch {
            // Use the HTTP status text when the error response is not JSON.
        }

        throw new Error(`Quest API error (${response.status}): ${detail}`);
    }

    return response;
}

async function sendJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await sendRequest(path, init);
    return response.json() as Promise<T>;
}

function jsonRequest(method: "POST" | "PATCH", body: unknown): RequestInit {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };
}

export const questRepository = {
    getAll(): Promise<Quest[]> {
        return sendJson<Quest[]>("");
    },

    create(quest: NewQuest): Promise<Quest> {
        return sendJson<Quest>("", jsonRequest("POST", quest));
    },

    updateReward(id: number, reward: string): Promise<Quest> {
        return sendJson<Quest>(
            `/${id}/reward`,
            jsonRequest("PATCH", { reward }),
        );
    },

    async delete(id: number): Promise<void> {
        await sendRequest(`/${id}`, { method: "DELETE" });
    },
};
