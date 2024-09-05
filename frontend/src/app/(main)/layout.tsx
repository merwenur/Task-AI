"use client";
import { axiosInstance } from "@/lib/utils";
import { SWRConfig } from "swr";
import { AuthProvider } from "../hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { io } from "socket.io-client";
import { useEffect } from "react";
type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
      auth: {
        userId: localStorage.getItem("userId"),
      },
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("checkRooms");
    });
    socket.on("notification", (data) => {
      console.log("Received data from socket", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axiosInstance.get(url),
      }}
    >
      <Toaster />
      <TooltipProvider>
        <AuthProvider>
          <main className="flex min-h-screen flex-col items-center justify-between ">
            {props.children}
          </main>
        </AuthProvider>
      </TooltipProvider>
    </SWRConfig>
  );
};

export default Layout;
