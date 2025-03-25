"use client";

import BlurText from "./BlurText";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="row-span-2 bg"></div>
      <div>
        <div className="flex flex-col justify-center items-center gap-8 w-[300px]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="col-start-2">3</div>
    </div>
  );
}
