import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux/es/exports"
import { handlelogout } from "../redux-toolkit/action"


const Header = () => {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)
  const user=useSelector((state) => state.login.loggedInUser)
  // console.log(user)
  const navigate = useNavigate()
  const logout = () => {
    dispatch(handlelogout(navigate))
  };

  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link to="/todo" className="navbar-brand" href="#">
          <i className="fa fa-eercast px-2" aria-hidden="true"></i> 
          Redux Todo
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {isAuthenticated && (
                <button className="nav-link btn btn-outline-dark" onClick={logout}>
                  Sign out
                </button>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/Adnantahir-98/salsoft"><i className="fa fa-github" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </nav>

  );
};

export default Header;
