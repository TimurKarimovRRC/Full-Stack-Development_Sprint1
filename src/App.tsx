import { Adventurers } from "./components/Adventurers/Adventurers";
import { useEffect, useState } from "react";
import { QuestAssignments } from "./components/QuestAssignments/QuestAssignments";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { QuestBoards, type Quest } from "./components/Quests/Quests";
import { QuestSubmission } from "./components/QuestSubmission/QuestSubmission";
import questData from "./data/Quests.json";

export function App() {
    const [currentPage, setCurrentPage] = useState(window.location.hash);
    const [quests, setQuests] = useState<Quest[]>(questData as Quest[]);
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless"
    ];

    useEffect(() => {
        function handleHashChange() {
            setCurrentPage(window.location.hash);
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const isQuestSubmissionPage = currentPage === "#quest-submission";

    function handleQuestSubmit(newQuest: Quest) {
        setQuests((currentQuests) => [newQuest, ...currentQuests]);
    }

    return (
        <Layout title={isQuestSubmissionPage ? "Quest Submission" : "Fantasy Quest Board"} members={members}>
            {isQuestSubmissionPage ? (
                <QuestSubmission onQuestSubmit={handleQuestSubmit} />
            ) : (
                <>
                    <QuestAssignments />
                    <QuestBoards quests={quests} />
                    <Adventurers />
                </>
            )}
        </Layout>
    );
}