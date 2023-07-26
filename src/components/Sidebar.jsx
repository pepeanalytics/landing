import { SidebarRedeem } from "./SidebarRedeem";
import React from "react";

import homeIcon from "../assets/images/home.svg";
import frog from "../assets/images/frog.png";
import roadmap from "../assets/images/roadmap.svg";
import SideBarIcon from "./SideBarIcon";
import { useRecoilValue } from "recoil";
import { holderVerifiedState, redeemedState } from "../recoil";

export default function Sidebar() {
  const isHolderVerified = useRecoilValue(holderVerifiedState);
  const isRedeemed = useRecoilValue(redeemedState);

  return (
    <div className="siderbarWrapper">
      <div className="sidebar">
        <SideBarIcon route={"/"} icon={homeIcon} />
        {(isHolderVerified || isRedeemed) && (
          <SideBarIcon
            route={"https://pepeanalytics-mintpage.pages.dev/"}
            icon={frog}
          />
        )}
        <SideBarIcon route={"/roadmap"} icon={roadmap} />
        {/* {!isRedeemed ? <SidebarRedeem /> : null} */}
      </div>
    </div>
  );
}
