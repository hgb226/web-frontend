"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/app/api/verify-email";

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    const verifyEmailPage = async () => {
      if (!token) {
        setMessage("Token is missing.");
        return;
      }

      try {
        const data = await verifyEmail(token); // data is already parsed JSON
        setMessage(data.message);
      } catch (error: any) {
        setMessage(error.message || "An error occurred.");
      }
    };

    verifyEmailPage(); // Invoke the function
  }, [token]);



  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {message === "Email verified successfully"}
    </div>
  );
};

export default VerifyEmail;