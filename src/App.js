import React, { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import MobDrawer from "./components/MobDrawer";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { NETWORK } from "./consts";

// import { switchNetwork } from "wagmi/actions";
import { useRecoilState } from "recoil";
import { holderVerifiedState } from "./recoil";
import axios, { AxiosError } from "axios";
import web3Config from "./web3.config";

function App() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [isHolderVerified, setIsHolderVerified] =
    useRecoilState(holderVerifiedState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const { chain } = useNetwork();
  const { switchNetworkAsync: switchNetwork } = useSwitchNetwork();

  // Always stay on the right chain
  useEffect(() => {
    console.log(NETWORK);

    if (!isConnected) return;

    if (chain?.id === web3Config.chain.id) return;

    (async () => {
      toast.info(`Please switch to the ${web3Config.chain.name} network`);
      try {
        await switchNetwork(web3Config.chain.id);
        toast.success("Switched to the right network");
      } catch (e) {
        console.log(e);
      }
    })();
  }, [switchNetwork, web3Config, isConnected, chain]);

  useEffect(() => {
    if (address && !isConnecting) {
      (async () => {
        try {
          const resp = await axios.post(
            "https://api.pepeanalytics.com/v1/verify",
            { address }
          );

          console.log(resp);
          setIsHolderVerified(resp?.data?.data?.holder);
        } catch (e) {
          console.log(e);
          if (e instanceof AxiosError) {
            setIsHolderVerified(e?.response?.data?.data?.holder);
          }
        }
      })();
    }
  }, [address]);

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }}>
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <Sidebar />
        <Content />
        <MobDrawer />
      </div>
    </>
  );
}

export default App;
