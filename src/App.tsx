import { Adventurers } from "./component/Adventurers/Adventurers";
import { QuestsAssignments } from "./components/QuestAssignments/QuestAssignment";
import { Layout } from "./component/Layout/Layout";
import "./App.css";

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "Mackinley Wanless"
    ];

    return (
        <Layout title="Fantasy Quest Board" members={members}>
            <QuestAssignments />
            <Adventurers />
        </Layout>
    );
}