import { Adventurers } from "./components/Adventurers/Adventurers";
import { Layout } from "./components/Layout/Layout";
import "./App.css";

// export function App() {
//     return (
//         <>
//             <header className="site-header parchment">
//                 <h1>Fantasy Quest Board</h1>
//             </header>

//             <main className="parchment">
//                 <Adventurers />
//             </main>

//             <footer className="site-footer parchment">
//                 <p>Timur Karimov · Aum Mistry · MacKinley Wanless</p>
//             </footer>
//         </>
//     );
// }

export function App() {
    const members = [
        "Timur Karimov",
        "Aum Mistry",
        "MacKinley Wanless"
    ];
        return (
            <Layout title="Fantasy Quest Board" members={members}>
                <Adventurers />
            </Layout>
        );
    }