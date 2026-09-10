import { Adventurers } from "./component/Adventurers/Adventurers";
import { Quests } from "./component/Quests/Quests";
import { Layout } from "./component/Layout/Layout";
import "./App.css";

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "MacKinley Wanless"
    ];

    return (
        <Layout title="Fantasy Quest Board" members={members}>
            <Quests />
            <Adventurers />
        </Layout>
    );
}