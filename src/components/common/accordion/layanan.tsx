"use client"

import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from "next/image";

interface AccordionItemProps {
  title: string;
  content: string;
  image: string;
}

const AccordionComponent: React.FC<{ items: AccordionItemProps[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={String(index)} className="border-none">
          <AccordionTrigger
            onClick={() => handleToggle(index)}
            className="flex justify-between items-center mb-7 p-4 bg-[#2A176F] text-white rounded-lg cursor-pointer"
          >
            <span className="text-md md:text-xl">{item.title}</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 mb-7 bg-gray-100 rounded-lg border border-black">
            <div className="flex">
              <Image 
              src={item.image}
              alt={item.title}
              className="object-cover rounded-lg"
              width="250"
              height="250"
              />   
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;