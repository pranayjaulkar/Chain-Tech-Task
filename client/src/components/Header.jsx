import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">
          User Profile
        </a>
        {user ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default Header;
