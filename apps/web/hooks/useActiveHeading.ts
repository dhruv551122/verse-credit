"use client";

import { useEffect, useState } from "react";

const OFFSET = 180;

const useActiveHeading = (headings: { id: string; title: string }[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
  if (!headings?.length) return;

  const elements = headings
    .map((h) => document.getElementById(h.id))
    .filter(Boolean) as HTMLElement[];

  if (!elements.length) return;

  const handleScroll = () => {
    let currentId: string | null = null;

    for (const el of elements) {
      if (el.getBoundingClientRect().top <= OFFSET) {
        currentId = el.id;
      } else {
        break;
      }
    }

    setActiveId((prev) => (prev === currentId ? prev : currentId));
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [headings]);
  
  return activeId;
};

export default useActiveHeading;



