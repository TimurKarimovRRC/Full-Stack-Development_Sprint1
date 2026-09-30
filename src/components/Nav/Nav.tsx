import { NavLink } from "react-router-dom";
import "./Nav.css";

export function Nav() {
    return (
        <nav className="site-nav parchment">
            <NavLink
                to="/quests"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Quests
            </NavLink>

            <NavLink
                to="/adventurers"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Adventurers
            </NavLink>

            <NavLink
                to="/assignments"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Quest Assignments
            </NavLink>
        </nav>
    );
}