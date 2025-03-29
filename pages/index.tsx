"use client";

import Link from "next/link";
import Image from "next/image";

import { signOut } from "next-auth/react";

import React from "react";

import moment from "moment";
import { useRouter } from "next/router";

const MyDataTable = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth");
  };

  return (
    <div className="relative">
      <div className="relative w-full h-screen bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW52ZW50b3J5JTIwdHJhY2tpbmclMjBncmFwaHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Netflix Background"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-4xl font-bold">Inventory App</h2>
          <p className="text-lg mt-2">
            Manage your inventory effortlessly with Inventory App. Add, track,
            and update products in real time while monitoring stock levels and
            profits. Stay organized, reduce losses, and streamline your business
            operations with ease..
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyDataTable;
