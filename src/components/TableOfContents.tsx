"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split("\n");
    const items: TOCItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        items.push({
          id,
          text,
          level,
        });
      }
    });

    setTocItems(items);
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-coffee-light/10 shadow-sm mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-serif font-bold text-coffee-dark">
          Table of Contents
        </h3>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-coffee-medium" />
        ) : (
          <ChevronRight className="w-5 h-5 text-coffee-medium" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left hover:text-gold-accent transition-colors ${
                item.level === 1
                  ? "font-semibold text-coffee-dark"
                  : item.level === 2
                  ? "font-medium text-coffee-dark ml-4"
                  : "text-coffee-medium ml-8"
              }`}
              style={{
                fontSize:
                  item.level === 1
                    ? "14px"
                    : item.level === 2
                    ? "13px"
                    : "12px",
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
