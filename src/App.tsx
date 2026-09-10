import { Adventurers } from "./components/Adventurers/Adventurers";
import { QuestAssignments } from "./components/QuestAssignments/QuestAssignment";
import { Layout } from "./components/Layout/Layout";
import "./App.css";

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "MacKinley Wanless"
    ];

    return (
        <Layout title="Fantasy Quest Board" members={members}>
            <QuestAssignments />
            <Adventurers />
        </Layout>
    );
}