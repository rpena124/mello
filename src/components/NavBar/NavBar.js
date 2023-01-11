import {Link} from 'react-router-dom'
import { logOut } from '../../utilities/users-service'

export default function NavBar({setUser}){
    return(
    <nav>
        <Link to="/boards">Boards</Link>
        {/* &nbsp; | &nbsp;
        <Link to="/boards/new">New Board</Link> */}
        &nbsp; | &nbsp;
    <button onClick={() => {logOut(); setUser(null)}}  >Log Out</button>
    </nav>)
} 