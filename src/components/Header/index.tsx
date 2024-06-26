"use client";

import { generateAuthTokenSignature } from "@/app/hooks/burnBonk";
import { useCreditsPurchase, useUser } from "@/app/hooks/useUser";
import Logo from "@/assets/logo.svg";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  IconCurrencyCent,
  IconPlugConnected,
  IconSparkles,
} from "@tabler/icons-react";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const TOKEN_KEY = "wagmi-token-9y837850";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { publicKey, disconnect } = useWallet();
  const { user, mutate } = useUser();
  const { addCredits } = useCreditsPurchase();
  const [cookies, setCookie] = useCookies([TOKEN_KEY]);

  useEffect(() => {
    // change global css var --global-bg based on isHome
    document.documentElement.style.setProperty(
      "--global-bg",
      isHome ? "#FDDE00" : "#FFFFFF"
    );
  }, [isHome]);
  const [loading, setLoading] = useState(false);
  const [signingToken, setSigningToken] = useState(false);

  const handleBonkBurn = async () => {
    setLoading(true);
    try {
      await addCredits(5);
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Failed to burn bonk");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!cookies[TOKEN_KEY] && publicKey) {
      setSigningToken(true);
      const signAuth = async () => {
        try {
          // Sign transaction for generating token with public key as message and store in cookies
          // toast.error("Token Expired, Please sign to to continue");
          const token = await generateAuthTokenSignature(publicKey);
          console.log("Token", token);
          setCookie(TOKEN_KEY, token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
          });
        } catch (e) {
          console.log(e);
          toast.error("Failed to sign token");
        }
        setSigningToken(false);
      };
      signAuth();
    }
  }, [publicKey, cookies]);

  return (
    <div
      className={classNames(
        "z-[400] transition-all duration-500 fixed top-0 left-0 w-full items-center justify-center",
        {}
      )}
      style={{
        padding: isHome ? "1rem max(calc(50vw - 18rem), 1rem) 0" : undefined,
      }}
    >
      <div
        className={classNames(
          "transition-all duration-500 bg-[#FFFFFF] h-16 flex items-center justify-between",
          {
            "rounded-[2rem] backdrop-blur-lg px-3 bg-opacity-70": isHome,
            "rounded-[0rem] backdrop-blur-xl bg-opacity-70": !isHome,
          }
        )}
        style={{
          boxShadow: "0px 4px 36.8px 0px rgba(0, 0, 0, 0.05)",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          padding: !isHome ? "0 max(calc(50vw - 18rem), 1rem)" : undefined,
        }}
      >
        <Link href="/">
          <Image src={Logo} alt="Wagmi.quest" height={36} priority />
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          key={publicKey?.toBase58()}
        >
          {!publicKey ? (
            <WalletMultiButton
              style={{
                borderRadius: "2rem",
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.9rem",
                backgroundColor: "black",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
              onClick={(a: any) => {
                console.log(a);
              }}
            >
              CONNECT
            </WalletMultiButton>
          ) : (
            <details className="dropdown dropdown-hover dropdown-bottom dropdown-end">
              <summary className="m-1 btn !bg-black !bg-opacity-10 !p-0 !border-none !h-12 !w-12 flex items-center justify-center">
                <img
                  src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${publicKey.toBase58()}`}
                  alt="Avatar"
                  className="rounded-full h-10 w-10"
                />
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
                <div className="flex items-center gap-0.5 flow-row bg-yellow-400 p-3 py-2 rounded-xl">
                  <IconCurrencyCent
                    color="white"
                    size={18}
                    className=" rounded-full ml-1 mr-2"
                  />
                  <div className="mr-1 text-gray-700">
                    {user?.credits || "-"}
                  </div>
                  <div className="text-gray-600">Credits</div>
                </div>
                <li>
                  <div
                    className="hover:bg-yellow-100 gap-3"
                    onClick={handleBonkBurn}
                  >
                    {loading ? (
                      <div className="loading w-[18px]" />
                    ) : (
                      <IconSparkles size={18} color="rgb(250 204 21)" />
                    )}
                    <div className="flex flex-col gap-0">
                      <div className="text-gray-600">Add 5 Credits</div>
                      <div className="text-gray-400 text-xs">[50 Bonk]</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div onClick={disconnect} className="hover:bg-red-100 gap-3">
                    <IconPlugConnected size={18} color="red" />
                    <div>Disconnet</div>
                  </div>
                </li>
              </ul>
            </details>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
