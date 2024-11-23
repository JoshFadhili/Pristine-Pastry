import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../lib/AuthContext"

const Header = () => {
  const navigate = useNavigate()
  const {user, logoutUser} = useAuth()

  return(
    <>
      <button onClick={logoutUser}>
        <Link to="/signin">Logout</Link>
      </button>
    </>
  )
}

export default Header