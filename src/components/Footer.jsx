import React from "react";
import Tooltip from "./Tooltip";

export default function Footer() {
  return (
    <div className="footer flex row sb al-ce">
      <div className="footer__text">
        Copyright 2023 pepe analytics. all rights reserved.
      </div>
      <Tooltip />
    </div>
  );
}
