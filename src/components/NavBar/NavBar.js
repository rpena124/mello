import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ setUser }, props) {
  console.log(props.data);
  return (
    <nav>
      <Link to="/boards">Boards</Link>
      {/* &nbsp; | &nbsp;
        <Link to="/boards/new">New Board</Link> */}
      &nbsp; | &nbsp;
      <button
        onClick={() => {
          logOut();
          setUser(null);
        }}
      >
        Log Out
      </button>
    </nav>
  );
}
