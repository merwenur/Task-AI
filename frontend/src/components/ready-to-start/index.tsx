import { Button } from "@/components/ui/button";
import content from "@/content.json";
import Link from "next/link";
const ReadyToStart = () => (
  <section
    id="ready-to-start"
    className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 "
  >
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {
              content.readyToGetStarted.title
            }
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            
            {
              content.readyToGetStarted.description
            }
          </p>
        </div>
        <Link href={content.readyToGetStarted.actionButton.href}>
        <Button size="lg">
          {
            content.readyToGetStarted.actionButton.text
          }
        </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default ReadyToStart;
