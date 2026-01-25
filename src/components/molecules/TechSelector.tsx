"use client";

import React, { useState, useMemo } from "react";
import { TECH_DICTIONARY } from "@/utils/tech-dictionary";
import { AiOutlineClose } from "react-icons/ai";

interface TechSelectorProps {
  selectedTechs: string[];
  onChange: (techs: string[]) => void;
}

export const TechSelector = ({ selectedTechs, onChange }: TechSelectorProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter existing tags and current query
  const suggestions = useMemo(() => {
    if (!query) return [];
    return TECH_DICTIONARY.filter(
      (tech) =>
        tech.toLowerCase().includes(query.toLowerCase()) &&
        !selectedTechs.includes(tech)
    ).slice(0, 5); // Limit to 5 suggestions
  }, [query, selectedTechs]);

  const addTech = (tech: string) => {
    onChange([...selectedTechs, tech]);
    setQuery("");
    setIsOpen(false);
  };

  const removeTech = (techToRemove: string) => {
    onChange(selectedTechs.filter((tech) => tech !== techToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query) {
      e.preventDefault();
      // Strict Mode: Only allow if it matches a dictionary entry exactly (case-insensitive)
      const formattedInput = query.trim().toLowerCase();
      const match = TECH_DICTIONARY.find(t => t.toLowerCase() === formattedInput);
      
      if (match && !selectedTechs.includes(match)) {
        addTech(match);
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Tecnologías (Tags)</label>
      
      {/* Pills Container */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTechs.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
          >
            {tech}
            <button
              type="button"
              onClick={() => removeTech(tech)}
              className="hover:text-destructive focus:outline-none ml-1"
            >
              <AiOutlineClose size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Input & Autocomplete */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click
          onFocus={() => setIsOpen(true)}
          placeholder="Escribe para buscar o añadir..."
          className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
        />

        {isOpen && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((tech) => (
              <li
                key={tech}
                className="px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => addTech(tech)}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Selecciona una tecnología de la lista.</p>
    </div>
  );
};
