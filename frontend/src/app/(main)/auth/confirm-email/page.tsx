"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRef } from "react";

export default function ConfirmEmail() {
  const { confirmEmail } = useAuth();
  const searchParams = useSearchParams();
  const isRequestSent = useRef(false); // Add this line
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const token = searchParams.get("hash");
    if (token && !isRequestSent.current) {
      // Modify this line
      isRequestSent.current = true; // Add this line
      confirmEmail.trigger(
        { token },
        {
          onSuccess: (data) => {
            toast.success("Email confirmed");
            setConfirmed(true);
          },
        }
      );
    }
  }, [searchParams, confirmEmail]);

  return confirmed ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">You are being redirected...</h1>
      <p>Please wait while we redirect you to the desired page.</p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">
        Your email is being confirmed...
      </h1>
      <p>Please wait while we redirect you to the desired page.</p>
    </div>
  );
}
