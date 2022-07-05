import React, { useState } from "react";
import "./Header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useAlert } from "react-alert";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Header() {
  const { isLoading, user } = useSelector((state) => state.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const logoutFunction = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate("/");
  };
  return (
    <>
      {" "}
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <nav className="main-nav">
          <div className="logo">
            <h2>
              <span>L</span>ibrary
            </h2>
            <h2>
              <span>A</span>pp
            </h2>
          </div>
          <div
            className={
              showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
            }
          >
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/Books"
                >
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/cart"
                >
                  <AiOutlineShoppingCart size={22} />
                </NavLink>
              </li>
              {user && user.role === "admin" && <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/Admin/Dashboard"
                >
                  DashBoard
                </NavLink>
              </li>}
              {showMediaIcons && (
                <li>
                  <button onClick={logoutFunction}>Logout</button>
                </li>
              )}
            </ul>
          </div>

          <div className="logout">
            <button onClick={logoutFunction}>Logout</button>
            {/* hambuger menu  */}
            <div className="hamburger-menu">
              <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Header;
