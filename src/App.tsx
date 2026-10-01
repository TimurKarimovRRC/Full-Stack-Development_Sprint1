import { useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { Adventurers } from "./components/Adventurers/Adventurers";
import { Layout } from "./components/Layout/Layout";
import { QuestBoards, type Quest } from "./components/Quests/Quests";
import { QuestSubmission } from "./components/QuestSubmission/QuestSubmission";
import { QuestAssignmentPage } from "./pages/QuestAssignmentPage/QuestAssignmentPage";

import type { Assignment } from "./types/assignments";

import adventurerData from "./data/Adventurers.json";
import questData from "./data/Quests.json";

import "./App.css";

export function App() {
    const [quests, setQuests] = useState<Quest[]>(questData as Quest[]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless",
    ];

    function handleQuestSubmit(newQuest: Quest) {
        setQuests((currentQuests) => [
            newQuest,
            ...currentQuests,
        ]);
    }

    return (
        <BrowserRouter>
            <Layout title="Fantasy Quest Board" members={members}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/quests" replace />}
                    />

                    <Route
                        path="/quests"
                        element={<QuestBoards quests={quests} />}
                    />

                    <Route
                        path="/quest-submission"
                        element={
                            <QuestSubmission
                                onQuestSubmit={handleQuestSubmit}
                            />
                        }
                    />

                    <Route
                        path="/adventurers"
                        element={<Adventurers />}
                    />

                    <Route
                        path="/assignments"
                        element={
                            <QuestAssignmentPage
                                adventurers={adventurerData}
                                quests={quests}
                                assignments={assignments}
                                setAssignments={setAssignments}
                            />
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}