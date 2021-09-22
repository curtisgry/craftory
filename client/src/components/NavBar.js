import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserProvider } from "../context/UserContext";
import { UserListProvider } from "../context/UserListsContext";
import { baseUrl } from "../utils/baseUrl";
import { useHistory } from "react-router";
const NavBar = ({ update }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { user, setLoading } = useContext(UserProvider.context);
  const { list } = useContext(UserListProvider.context);
  const history = useHistory();

  // const toggle = () => setIsOpen(!isOpen);

  function makeLinks(arr) {
    if (arr) {
      if (arr.length) {
        const links = arr.map((item) => {
          return (
            <li key={item._id} className="dropdown-item">
              <Link className="nav-link" to={`/dashboard/${item._id}`}>
                {item.name}
              </Link>
            </li>
          );
        });

        return links;
      }
    }
  }

  function logout() {
    axios.get(`${baseUrl}/logout`, {withCredentials: true}).then((res) => {
      setLoading(true);
      history.push("/");
    });
  }

  function renderCondLinks() {
    if (!user) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={logout}>
              Log Out
            </a>
          </li>
        </>
      );
    }
  }

  // useEffect(() => {
  //   (async function fetchData() {
  //     const res = await axios.get("/nav");
  //     const { companies } = res.data;
  //     if (companies) {
  //       setUserCompanies([...companies]);
  //     }
  //   })();
  // }, [user]);

  const dashboardLinks = makeLinks(list);
  const conditionalLinks = renderCondLinks();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-muted" to="/">
          Craftory
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {conditionalLinks}

            {dashboardLinks && dashboardLinks.length ? (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Inventory Lists
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {dashboardLinks}
                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
