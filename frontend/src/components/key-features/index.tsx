import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ZapIcon, ArrowRightIcon, RefreshCwIcon, GridIcon } from "lucide-react";
import content from "@/content.json";
// FeatureCard component
const FeatureCard = ({
  title,
  Icon,
  description,
}: {
  title: string;
  Icon: React.ElementType;
  description: string;
}) => (
  <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex items-center justify-center p-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t-lg">
      <Icon className="h-12 w-12 text-white" />
    </CardHeader>
    <CardContent className="p-6 text-center">
      <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </CardContent>
  </Card>
);

const KeyFeatures = () => (
  <section
    id="features"
    className="w-full py-12 md:py-20  bg-gray-100 dark:bg-gray-800"
  >
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        Key Features
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            Icon={
              {
                ZapIcon: ZapIcon,
                ArrowRightIcon: ArrowRightIcon,
                RefreshCwIcon: RefreshCwIcon,
                GridIcon: GridIcon,
              }[feature.icon as string]  as  React.ElementType
            }
            description={feature.description}
          />
        ))}
      </div>
    </div>
  </section>
);

export default KeyFeatures;
