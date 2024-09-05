import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface AccordionItemComponentProps {
  value: string;
  trigger: string;
  content: string;
}

const AccordionItemComponent: React.FC<AccordionItemComponentProps> = ({
  value,
  trigger,
  content,
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left">{trigger}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItemComponent;
