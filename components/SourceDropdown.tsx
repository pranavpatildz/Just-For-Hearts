"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Megaphone, MessageCircle, MoreHorizontal, Stethoscope, Users } from "lucide-react";
import { FaFacebook, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa";
import { SOURCE_OPTIONS } from "@/constants/sourceOptions";

type SourceOption =
  | "Instagram"
  | "Facebook"
  | "Google"
  | "YouTube"
  | "Friend/Family"
  | "Doctor Referral"
  | "WhatsApp"
  | "Advertisement"
  | "Website"
  | "Other";

const optionIcons: Record<SourceOption, ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Google: FaGoogle,
  YouTube: FaYoutube,
  "Friend/Family": Users,
  "Doctor Referral": Stethoscope,
  WhatsApp: MessageCircle,
  Advertisement: Megaphone,
  Website: Globe,
  Other: MoreHorizontal,
};

const options: Array<{ value: SourceOption; label: SourceOption; icon: ComponentType<{ className?: string }> }> =
  SOURCE_OPTIONS.map((option) => ({
    value: option as SourceOption,
    label: option as SourceOption,
    icon: optionIcons[option as SourceOption],
  }));

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
    <div ref={rootRef} className="relative z-[1000] overflow-visible">
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
        <div className="dropdown-menu absolute left-0 top-full mt-2 w-full border border-gray-200">
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
