interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="site-header parchment">
            <h1>{title}</h1>
        </header>
    );
}