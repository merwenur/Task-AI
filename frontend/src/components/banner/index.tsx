import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import content from "@/content.json";
const Banner = () => {
  return (
    <section className="w-full py-12 container">
      <div className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 text-center md:text-left">
          <div className="md:w-1/2 space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {content.banner.title}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {content.banner.description}
            </p>
            <div className="space-x-4">
              <Link href={content.banner.actionButton.href}>
                <Button>{content.banner.actionButton.text}</Button>
              </Link>
              <Link href={content.banner.actionButton2.href}>
                <Button variant="outline">
                  {content.banner.actionButton2.text}
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src={content.banner.image}
              alt="Banner"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
