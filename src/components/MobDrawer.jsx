import React from "react";
import frog from "../assets/images/frog.png";
import homeIcon from "../assets/images/home.svg";
import roadmap from "../assets/images/roadmap.svg";

import Button from "./Button";
import CtaButtons from "./CtaButtons";
import logo from "../assets/images/logo.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { holderVerifiedState, isDrawerOpen } from "../recoil";
import { Link, NavLink } from "react-router-dom";

export default function MobDrawer() {
  const isHolderVerified = useRecoilValue(holderVerifiedState);
  const [drawerOpen, setDrawerOpen] = useRecoilState(isDrawerOpen);
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div
      className={`mob-drawer__container mob ${drawerOpen ? "enter" : "exit"}`}
    >
      <div className="mobnav-container">
        <Link to="/main">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="flex row navbar-right">
          <Button
            variant="secondary"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className="navbar-right__small-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7.029"
                height="11.145"
                viewBox="0 0 7.029 11.145"
              >
                <g id="back" transform="translate(15.029 12.288) rotate(180)">
                  <path
                    id="Path_246"
                    data-name="Path 246"
                    d="M13.642,1.143,8,6.785l5.5,5.5L14.889,10.9,10.774,6.785,15.029,2.53Z"
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </span>
          </Button>
        </div>
      </div>
      <div className="flex col mob-drawer__links">
        <Nav
          icon={homeIcon}
          title={"HOME"}
          closeDrawer={closeDrawer}
          route={"/"}
        />
        {isHolderVerified && (
          <Nav
            icon={frog}
            title={"DASH"}
            closeDrawer={closeDrawer}
            route={"https://pepeanalytics-mintpage.pages.dev/"}
          />
        )}

        <Nav
          icon={roadmap}
          title={"ROADMAP"}
          closeDrawer={closeDrawer}
          route={"/roadmap"}
        />
      </div>
      <CtaButtons />
    </div>
  );
}

function Nav({ icon, title, route, closeDrawer }) {
  return (
    <NavLink onClick={closeDrawer} className="mob-drawer__nav-link" to={route}>
      <img src={icon} alt="nav-icon" />
      <span className="nav-link__title">{title}</span>
    </NavLink>
  );
}
