import React from "react";
import rightArrow from "../assets/images/rightArrow.svg";
import Button from "./Button";

export function SidebarRedeem() {
  const handleRedeem = () => {};

  return (
    <div className="sidebar-redeem">
      <div className="text">redeem your nft for pepeai tokens</div>
      <Button onClick={handleRedeem} variant="primary">
        <span className="sidebar-redeem__button">
          <img src={rightArrow} alt="arrow" />
        </span>
      </Button>
    </div>
  );
}
