"use client";

import bg from "@/assets/bg.svg";
import bonk from "@/assets/bonk.png";
import { IconBrandGithub, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { burnBONK } from "../hooks/burnBonk";
export default function Chat() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { publicKey } = useWallet();
  useEffect(() => {
    ref.current?.focus?.();
  }, []);

  const handleBonkBurn = async () => {
    let signature = "";
    const _signature = await burnBONK(
      "A14YRiYmr3psqEMYNTfm16943JBzDPMG3F9oB5A9pk63",
      100
    );
    if (_signature) {
      debugger;
      signature = _signature;
    } else return;
  };
  return (
    <>
      <Image
        src={bg}
        alt="Background"
        className="h-full w-[80vw] mx-auto -z-10 opacity-80 fixed top-0 left-[10vw]"
        objectFit="fill"
        priority
        style={{
          filter: "drop-shadow(0px 4px 36px #B7A100)",
        }}
      />
      <div className="min-h-[100dvh] flex flex-col justify-center items-center py-20 gap-10">
        <div className="flex flex-col gap-8 items-center my-auto">
          <div className="py-2 px-4 flex gap-4 bg-[#020227] bg-opacity-5 rounded-full">
            <div>POWERED BY BONK</div>
            <Image src={bonk} alt="Bonk" height={24} />
          </div>
          <h1 className="in-s text-5xl text-center uppercase leading-tight">
            Engage with <strong>Intuitive AI</strong>
            <br />
            and <strong>Generative UI</strong>
          </h1>
          <div className="flex items-center justify-center outline outline-[#ADAA9E] border-opacity-30 p-1.5 rounded-[1.7rem] w-full max-w-[35rem] mt-4 focus-within:outline-[2px] transition-all duration-100">
            <form
              className="w-full bg-white bg-opacity-80 items-center justify-center grid rounded-[1.2rem] pl-4 gap-2"
              style={{
                gridTemplateColumns: "auto 1fr auto",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if (!publicKey) return;

                // router.push(`/${ref.current?.value.toLowerCase().trim()}`);
                router.push(
                  `/${ref.current?.value
                    .toLowerCase()
                    .trim()
                    .replace(/\s/g, "-")}`
                );
              }}
            >
              <div className="font-bold">ASK /</div>
              <input
                name="topic"
                type="topic"
                defaultValue="WHAT IS BONK COIN"
                placeholder="WHAT IS SOLANA..."
                className="!bg-transparent !border-none !outline-none uppercase"
                ref={ref}
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn !rounded-[1.2rem] btn-md !h-[3.5rem]"
              >
                GENERATE
                <IconSparkles color="white" />
              </button>
            </form>
          </div>
        </div>
        <div className="in-s uppercase max-w-[33rem] text-center text-sm opacity-80">
          Discover a smarter way to learn and find information with our
          AI-driven platform. It not only provides detailed insights but also
          creates interactive UI components on-the-fly
        </div>
        <WalletMultiButton />
      </div>
      <button
        className="fixed bottom-4 right-4 btn bg-yellow p-5"
        onClick={handleBonkBurn}
      >
        {" "}
        burn bonk{" "}
      </button>
      <div className="!rotate-90 fixed bottom-14 -right-4">
        <a
          href="https://github.com/abhisheknaiidu/gpt-generative-ui"
          target="_blank"
        >
          <button className="!text-[#FDDE00] btn">
            GiTHUB <IconBrandGithub size={20} color="#FDDE00" />
          </button>
        </a>
      </div>
    </>
  );
}