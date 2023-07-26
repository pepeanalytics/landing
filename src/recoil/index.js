import { atom } from "recoil";

export const isDrawerOpen = atom({
  key: "isDrawerOpen",
  default: false,
});

export const isTooltipOpenState = atom({
  key: "isTooltipOpenState",
  default: false,
});

export const contractMintStageAtom = atom({
  key: "contractMintStage",
  default: "0",
});

export const holderVerifiedState = atom({
  key: "holderVerifiedState",
  default: false,
});

export const redeemedState = atom({
  key: "redeemedState",
  default: false,
});
