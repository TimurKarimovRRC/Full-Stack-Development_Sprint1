import type { ReactNode } from "react";
import { Header } from "../Header/Header";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";

interface LayoutProps {
    title: string;
    members: string[];
    children: ReactNode;
}

export function Layout({ title, members, children }: LayoutProps) {
    return (
        <>
            <Header title={title} />

            <Nav />

            <main id="main-content" className="parchment">
                {children}
            </main>

            <Footer members={members} />
        </>
    );
}