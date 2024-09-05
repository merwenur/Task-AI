import { Accordion } from "@/components/ui/accordion";
import AccordionItem from "./AccordionItem";
import content from "@/content.json";
const FAQ = () => {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
           {
            content.faq.title
           }
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
         {
          content.faq.questions.map((question, index) => (
            <AccordionItem
              key={index}
              trigger={question.question}
              content={question.answer}
              value={
                "question-" + index
              }
            />
          ))
         }
     
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
