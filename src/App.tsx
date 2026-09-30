import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { Adventurers } from "./components/Adventurers/Adventurers";
import { QuestAssignments } from "./components/QuestAssignments/QuestAssignments";
import { Layout } from "./components/Layout/Layout";
import { QuestBoards } from "./components/Quests/Quests";

import "./App.css";

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless",
    ];

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
                        element={<QuestBoards />}
                    />

                    <Route
                        path="/adventurers"
                        element={<Adventurers />}
                    />

                    <Route
                        path="/assignments"
                        element={<QuestAssignments />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}