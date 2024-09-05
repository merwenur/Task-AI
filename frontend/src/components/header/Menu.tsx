"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover components
import { Button } from "../ui/button";
import content from "@/content.json";

interface NavProps {
  isMobile: boolean;
}



const Nav = ({ isMobile }: NavProps) => (
  <nav className={`flex ${isMobile ? "flex-col gap-4" : "flex-row gap-6"}`}>
    {content.header.navLinks.map((link, index) => (
      <Link
        key={index}
        className="font-medium hover:underline underline-offset-4"
        href={link.href}
      >
        {link.text}
      </Link>
    ))}
  </nav>
);

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {isMobile ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Nav isMobile={true} />
          </PopoverContent>
        </Popover>
      ) : (
        <Nav isMobile={false} />
      )}
    </div>
  );
};

export default Menu;
