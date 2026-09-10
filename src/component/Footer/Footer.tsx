interface FooterProps {
    members: string[];
}

export function Footer({ members }: FooterProps) {
    return (
        <footer className="site-footer parchment">
            <p>{members.join(" · ")}</p>
        </footer>
    );
}