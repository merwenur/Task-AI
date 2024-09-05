import Image from "next/image";
import content from "@/content.json";
const Logo = () => (
  <>
    <Image
      src={content.logo}
      alt="Commafusion"
      width={200}
      height={100}
      className="hidden md:block"
    />
    <Image
      src={content.logo}
      alt="Commafusion"
      width={250}
      height={50}
      className="block md:hidden -ml-8"
    />
    <span className="sr-only">
      {content.app.name}
    </span>
  </>
);

export default Logo;
