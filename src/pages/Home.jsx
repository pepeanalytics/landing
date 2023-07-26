import React, { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import MobNavbar from "../components/MobNavbar";
import Redeem from "../components/Redeem";
import { useRecoilState, useRecoilValue } from "recoil";
import { redeemedState } from "../recoil";
import Redeemed from "../components/Redeemed";

import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  usePublicClient,
  useContractRead,
} from "wagmi";
import web3Config from "../web3.config";
import { toast } from "react-toastify";
import axios from "axios";
import { useScroll } from "framer-motion";

export default function Home() {
  const soldOut = false;

  const { address, isConnected } = useAccount();
  const [redeemed, setRedeemed] = useRecoilState(redeemedState);
  const [isRedeemLoading, updateLoading] = useState(false);
  const publicClient = usePublicClient({ chainId: web3Config.chain.id });

  const { config, error } = usePrepareContractWrite({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    chainId: web3Config.chain.id,
    functionName: "setApprovalForAll",
    args: [web3Config.redeemContractAddress, true],
  });

  const { data: alreadyApproved } = useContractRead({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    chainId: web3Config.chain.id,
    functionName: "isApprovedForAll",
    args: [address, web3Config.redeemContractAddress],
  });

  const { writeAsync: setApprovalForAll, isLoading } = useContractWrite(config);

  const [isApproved, setIsApproved] = useState(false);

  // const { config: redeemConfig, error: redeemError } = usePrepareContractWrite({
  //   address: web3Config.redeemContractAddress,
  //   abi: web3Config.redeemContractABI,
  //   chainId: web3Config.chain.id,
  //   functionName: "redeemNft",
  //   args: ["1"],
  // });

  const { writeAsync: redeemNft } = useContractWrite({
    address: web3Config.redeemContractAddress,
    abi: web3Config.redeemContractABI,
    chainId: web3Config.chain.id,
    functionName: "redeemNfts",
  });

  const handleRedeem = async () => {
    if (!isConnected) return toast.error("Please connect your wallet first!");

    if (!isRedeemLoading) {
      // console.log({ error });

      // Jojo this is where it starts while this whole thing happens handle redeem should show loading icon Akash has done
      if (setApprovalForAll) {
        updateLoading(true);
        try {
          let { data: apiResp } = await axios.get(
            "https://api.pepeanalytics.com/v1/holders/nft/" + address
          );
          let tokens = apiResp.data;

          if (tokens.length === 0) {
            toast.error("You do not own any NFTs to redeem!");
            throw new Error("No NFTs to redeem");
          }

          // ensure to test that after this approval happens the parallel call of the next redeem function works
          if (!alreadyApproved && !isApproved) {
            let approvalTx = await setApprovalForAll();

            // console.log(approvalTx.hash);

            let rc = await publicClient.waitForTransactionReceipt({
              hash: approvalTx.hash,
            });
            setIsApproved(true);
          }

          await redeemNft({
            args: [tokens],
          });

          //On sucess here show the new component Akash has made
          setRedeemed(true);
        } catch (e) {
          toast.error("An error occured while redeeming your PepeAI tokens!");
          console.log(e);
          // If any error just show undo the loading
        } finally {
          updateLoading(false);
        }
      }
    }
  };

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <Hero>
        <div className={"hero-left"}>
          {!redeemed ? (
            <Redeem
              soldOut={soldOut}
              loading={isRedeemLoading}
              handleRedeem={handleRedeem}
            />
          ) : (
            <Redeemed />
          )}
        </div>
      </Hero>
      <Footer />
    </>
  );
}
