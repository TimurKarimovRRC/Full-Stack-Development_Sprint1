import { NavLink } from "react-router-dom";
import "./Nav.css";

export function Nav() {
    return (
        <nav
            className="site-nav parchment"
            aria-label="Main navigation"
        >
            <NavLink
                to="/quests"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Quest Board
            </NavLink>

            <NavLink
                to="/quest-submission"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Quest Submission
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