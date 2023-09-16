"use client";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  singinUrlParam?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider?.id)}
            className="button my-auto ms-auto me-2"
          >
            <Image src="/google.svg" alt="Logo google" width={30} height={30} />
          </button>
        ))}
      </>
    );
  }
};

export default AuthProvider;
