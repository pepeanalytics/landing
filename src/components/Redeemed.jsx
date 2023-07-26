import React from "react";
import RedeemBtn from "./RedeemBtn";

export default function Redeemed() {
  const handleClicked = () => {
    window.open("http://app.pepeanalytics.com", "_blank");
  };
  return (
    <>
      <div className={`hello`}>Redeemed!</div>
      <div className="reserve">
        <span>
          You have Redeemed <br className="pc" />
          your PepeAI{" "}
          <span>
            <img
              className="home-hero__pepelogo"
              src={require("../assets/images/logoMain.png")}
              alt="logoMain"
            />
          </span>
          <br />
          tokens! Head to
          <br />
          the dashboard below
        </span>
      </div>
      <div className="flex row al-ce mint-btn-wrapper">
        <RedeemBtn
          minWidth={"19rem"}
          text={"Go to Dashboard"}
          onClick={handleClicked}
        />
      </div>
    </>
  );
}
