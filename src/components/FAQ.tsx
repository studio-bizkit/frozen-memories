"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQ() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 px-6 md:p-6 w-full md:w-6xl">
      <div className="row-span-2 flex flex-col gap-4 p-4 md:p-6 border border-accent-dark justify-between bg-accent-dark text-second-background">
        <h2 className="text-xl md:text-2xl font-semibold font-playfair-display">
          Get in Touch
        </h2>
        <Input type="text" placeholder="Your Name" />
        <Input type="email" placeholder="Your Email" />
        <Input type="tel" placeholder="WhatsApp Number" />
        <Textarea placeholder="Your Message" className="h-20 md:h-24" />
        <Button className="w-full">Send Message</Button>
      </div>

      {/* Right Top - FAQ Section */}
      <div className="p-4 md:p-6 pb-1 border border-accent-dark">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-playfair-display">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is your service reliable?</AccordionTrigger>
            <AccordionContent>
              Absolutely! We prioritize quality and customer satisfaction.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I book a service?</AccordionTrigger>
            <AccordionContent>
              Simply fill out the form, and we’ll get in touch with you!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right Bottom - Company Contact Info */}
      <div className="flex flex-col justify-start items-start p-4 md:p-0">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 font-playfair-display">
          Contact Us
        </h2>
        <p>
          <strong>Email:</strong> support@company.com
        </p>
        <p>
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>Location:</strong> 123 Business St, Bengaluru, India
        </p>
      </div>
    </div>
  );
}
