"use client";
import { SessionInterface } from "@/common.types";
import { signOut } from "next-auth/react";
import Image from "next/image";

const ProfileMenu = ({ user }: { user: SessionInterface["user"] }) => {
  const { name, image } = user;
  return (
    <div className="flex ms-auto justify-around">
      <div className="flex flex-col text-center me-3">
        <div className="w-8 h-8 overflow-hidden mx-auto rounded-full userProfileAvatar">
          <Image
            src={image as string}
            alt="user avatar"
            width={30}
            height={30}
            className="w-full h-full object-contain"
          />
        </div>
        <p
          className="leading-loose mt-1"
          style={{ fontSize: "0.5rem" }}
        >{`Dżentelman ${name.split(" ")[0]}`}</p>
      </div>
      <div className="flex flex-col text-center ms-3">
        <button onClick={() => signOut()} id="wylyz" className="button">
          <Image
            src={"/wylyz.svg"}
            alt="wylyz"
            width={30}
            height={30}
            style={{ fill: "#fff" }}
            className="w-full h-full object-contain"
          />
        </button>
        <label
          htmlFor="wylyz"
          className="leading-loose mt-1"
          style={{ fontSize: "0.5rem" }}
        >
          Wylyź
        </label>
      </div>
    </div>
  );
};

export default ProfileMenu;
