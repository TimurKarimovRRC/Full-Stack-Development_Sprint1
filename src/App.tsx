import { Adventurers } from "./component/Adventurers";
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
            </main>

            <footer className="site-footer parchment">
                <p>Timur Karimov · Aum Mistry · MacKinley Wanless</p>
            </footer>
        </>
    );
}
