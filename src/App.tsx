import { Adventurers } from "./components/Adventurers/Adventurers";
import { QuestAssingments } from "./components/QuestAssignments/QuestAssignment";
import "./App.css";

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "MacKinley Wanless"
    ];
        return (
            <Layout title="Fantasy Quest Board" members={members}>
                <Adventurers />
                <QuestAssignments />
            </main>

            <footer className="site-footer parchment">
                <p>Timur Karimov · Aum Mistry · MacKinley Wanless</p>
            </footer>
        </>
    );
}
