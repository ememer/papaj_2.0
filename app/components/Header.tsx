import Image from "next/image";
import React from "react";
import AuthProvider from "./AuthProvider";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

const Header = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="font-bold text-4xl shadow-md h-10-screen flex px-4">
      <div className="container mx-auto my-auto flex">
        <Link href="/" className="w-16">
          <Image
            className="h-auto w-auto my-auto inline-block"
            src="/logo-black.svg"
            alt="Logo"
            width={80}
            height={30}
          />
        </Link>
        {session?.user ? (
          <ProfileMenu user={session?.user} />
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Header;
