import { useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { Adventurers } from "./components/Adventurers/Adventurers";
import { Layout } from "./components/Layout/Layout";
import { QuestBoards } from "./components/Quests/Quests";
import { QuestSubmission } from "./components/QuestSubmission/QuestSubmission";
import { QuestAssignmentPage } from "./pages/QuestAssignmentPage/QuestAssignmentPage";

import type { Assignment } from "./types/assignments";

import "./App.css";

/**
 * Defines application routes and the shared layout.
 * Feature pages retrieve adventurers and quests through their hooks.
 * Assignment state remains shared through App.
 */
export function App() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless",
    ];

    return (
        <BrowserRouter>
            <Layout
                title="Fantasy Quest Board"
                members={members}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/quests" replace />}
                    />

                    <Route
                        path="/quests"
                        element={<QuestBoards />}
                    />

                    <Route
                        path="/quest-submission"
                        element={<QuestSubmission />}
                    />

                    <Route
                        path="/adventurers"
                        element={<Adventurers />}
                    />

                    <Route
                        path="/assignments"
                        element={
                            <QuestAssignmentPage
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
