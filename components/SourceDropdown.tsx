"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import { ChevronDown, MoreHorizontal, User } from "lucide-react";
import { FaFacebook, FaGoogle, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

type SourceOption =
  | "Existing Patient"
  | "YouTube"
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "Google"
  | "Other";

const options: Array<{ value: SourceOption; label: SourceOption; icon: ComponentType<{ className?: string }> }> = [
  { value: "Existing Patient", label: "Existing Patient", icon: User },
  { value: "YouTube", label: "YouTube", icon: FaYoutube },
  { value: "WhatsApp", label: "WhatsApp", icon: FaWhatsapp },
  { value: "Instagram", label: "Instagram", icon: FaInstagram },
  { value: "Facebook", label: "Facebook", icon: FaFacebook },
  { value: "Google", label: "Google", icon: FaGoogle },
  { value: "Other", label: "Other", icon: MoreHorizontal },
];

type SourceDropdownProps = {
  value: string;
  onChange: (value: SourceOption) => void;
};

export default function SourceDropdown({ value, onChange }: SourceDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 shadow-sm hover:border-red-400 focus:ring-2 focus:ring-red-200 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`flex items-center gap-2 ${selected ? "font-medium text-gray-900" : "text-gray-500"}`}>
          {selected ? (
            <>
              <selected.icon className="w-4 h-4" />
              {selected.label}
            </>
          ) : (
            "Source / Reference"
          )}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-red-50 hover:text-red-600 cursor-pointer transition flex items-center gap-2"
                role="option"
                aria-selected={value === option.value}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
