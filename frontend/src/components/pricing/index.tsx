import PricingCard from "./PricingCard";
import content from "@/content.json";
const Pricing = () => {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {content.pricing.title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.pricing.plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.name}
              description={plan.description}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
