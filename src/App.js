import React, { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import MobDrawer from "./components/MobDrawer";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { useRecoilState } from "recoil";
import { holderVerifiedState } from "./recoil";
import axios, { AxiosError } from "axios";

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [isHolderVerified, setIsHolderVerified] =
    useRecoilState(holderVerifiedState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

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
