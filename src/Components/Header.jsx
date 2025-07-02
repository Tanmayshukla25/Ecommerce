import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { auth } from "./Firebase";
import { UserContext } from "./UserContext";

function Header() {
  const { input, setInput, Cart } = useContext(UserContext); // Cart is a number
  const navigate = useNavigate();
  const user = auth.currentUser;

  async function handleLogout() {
    await auth.signOut();
    navigate("/");
    console.log("SignOut Successful");
  }

  return (
    <div className="ParentDiv">
      <div className="header">
        <h1>
          <Link to="/">Ecommerce</Link>
        </h1>
        <nav>
          <input
            type="text"
            className="inputwidth"
            placeholder="Search Products With Ecommerce"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ul className="lists">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li>
              <Link to="/cart">
                Cart <sup className="super">{Cart || 0}</sup>
              </Link>
            </li>
            <li>
              {user ? (
                <button className="loginBtn" onClick={handleLogout} title="Logout">
                  <LuLogOut size={23} />
                </button>
              ) : (
                <Link to="/login">
                  <button className="loginBtn" title="Login">
                    <LuLogIn size={23} />
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
