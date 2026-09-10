import { Adventurers } from "./component/Adventurers";
import { QuestAssignments } from "./component/quest-assignments/QuestAssignment";
import "./App.css";

export function App() {
    return (
        <>
            <header className="site-header parchment">
                <h1>Fantasy Quest Board</h1>
            </header>

            <main className="parchment">
                <Adventurers />
                <QuestAssignments />
            </main>

            <footer className="site-footer parchment">
                <p>Timur Karimov · Aum Mistry · MacKinley Wanless</p>
            </footer>
        </>
    );
}