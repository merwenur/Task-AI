import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import Menu from "./Menu";
import content from "@/content.json";
const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 fixed top-0 left-0 right-0 z-50">
    <div className="px-4 lg:px-6 h-14 justify-between flex gap-2 items-center container">
      <Link className="flex items-center justify-center" href="#">
        <Logo />
      </Link>
      <div className=" md:ml-0 flex gap-4 sm:gap-6">
        <Menu />
      </div>
      <div className="flex items-center gap-4">
        {content.header.actionButtons.map((button, index) => (
          <Link key={index} href={button.href}>
            <Button size="default" className="text-md hidden md:block">
              {button.text}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  </header>
);

export default Header;
