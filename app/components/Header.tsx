import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <nav className="font-bold text-4xl shadow-md h-10-screen flex px-4">
      <div className="container mx-auto my-auto">
        <Image src="/logo-black.svg" alt="Logo" width={50} height={50} />
      </div>
    </nav>
  );
};

export default Header;
