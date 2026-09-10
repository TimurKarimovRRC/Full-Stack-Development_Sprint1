import type { ReactNode } from "react";
import { Header } from "../Header/Header";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";


export function Layout({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="page">
            <Header title={title} />
            <Nav />
            <main className="parchment">
                {children}
            </main>
            <Footer />
        </div>
    );
}