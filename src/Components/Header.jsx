import { UserContext } from "./UserContext"
import { useContext } from "react"
import { IoHeart } from "react-icons/io5";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { auth } from "./Firebase";

function Header() {
  const { input, setInput } = useContext(UserContext);
  const { Cart, data } = useContext(UserContext);
  console.log(data);
  
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.signOut();
    navigate("/");
    console.log("SignOut Successful");
  }

  return (
    <>
      <div className='header'>
        <h1><Link to={"/"}>Ecommerce</Link></h1>
        <nav>
          <input
            type="text"
            className="inputwidth"
            placeholder="search Products With Ecommerce"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ul className='lists'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/contact"}>Contact</Link></li>
            <li><Link to={"/blog"}>Blog</Link></li>
            <li>
              <Link to={"/cart"}>
                Cart <sup className="super">{Cart}</sup>
              </Link>
            </li>
            <li>
              {Cart ? (
                <button className="loginBtn" onClick={handleLogout}>
                  <LuLogOut size={23} />
                </button>
              ) : (
                <Link to="/login">
                  <button className="loginBtn">
                    <LuLogIn size={23} />
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
