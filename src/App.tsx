import { Adventurers } from "./component/Adventurers";
import "./App.css";

export function App() {
    return (
        <>
            <header className="site-header parchment">
                <h1>Fantasy Quest Board</h1>
            </header>

            <main className="parchment">
                <Adventurers />
            </main>

            <footer className="site-footer parchment">
                <p>Timur Karimov · Aum Mistry · MacKinley Wanless</p>
            </footer>
        </>
    );
}