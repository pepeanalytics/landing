import React from "react";
import RedeemBtn from "./RedeemBtn";

export default function Redeem({ soldOut, loading, handleRedeem }) {
  const handleShowMe = () =>
    window.open(
      "https://medium.com/@pepeanalytics/pepe-analytics-official-launch-details-d58fe61484b1",
      "_blank"
    );
  return (
    <>
      <div className={`hello ${soldOut ? "sold-out" : ""}`}>
        its time!
        {soldOut ? <span className="sold-out-banner">Sold out</span> : null}
      </div>
      <div className="reserve">
        <span>
          redeem your coupon <br className="pc" />
          now for PEPEAI{" "}
          <span>
            <img
              className="home-hero__pepelogo"
              src={require("../assets/images/logoMain.png")}
              alt="logoMain"
            />
          </span>
          <br />
          tokens
        </span>
      </div>
      <div className="flex row al-ce mint-btn-wrapper">
        <RedeemBtn minWidth="18rem" onClick={handleRedeem} loading={loading} />

        <p onClick={handleShowMe} className="show-me">
          Show me what it does first
        </p>
      </div>
    </>
  );
}
