import React from "react";
import Button from "./Button";
import rightArrow from "../assets/images/rightArrow.svg";
import UniversalLoader from "./UniversalLoader";

export default function RedeemBtn({
  text = "Redeem Coupon",
  minWidth = "auto",
  loading,
  onClick,
}) {
  return (
    <Button onClick={onClick} id={"mintBtn"} variant={"mint"}>
      <span
        style={{
          minWidth,
        }}
      >
        {loading ? (
          <UniversalLoader />
        ) : (
          <>
            <p>{text}</p>

            <img className="rightArrow" src={rightArrow} alt="arrow" />
          </>
        )}
      </span>
    </Button>
  );
}
