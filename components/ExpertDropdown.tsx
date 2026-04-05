"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Expert = {
  name: string;
  price: number;
};

type ExpertDropdownProps = {
  experts: ReadonlyArray<Expert>;
  selectedExpert: string;
  onChange: (value: string) => void;
};

function formatPrice(price: number) {
  return `Rs. ${price}`;
}

export default function ExpertDropdown({
  experts,
  selectedExpert,
  onChange,
}: ExpertDropdownProps) {
  const [query, setQuery] = useState("");

  const filteredExperts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return experts;

    return experts.filter((expert) =>
      `${expert.name} ${expert.price}`.toLowerCase().includes(normalizedQuery)
    );
  }, [experts, query]);

  const selectedOption = experts.find((expert) => expert.name === selectedExpert) ?? null;

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
      <label className="text-sm font-semibold text-teal-600">Select Expert</label>

      <Combobox
        value={selectedOption}
        onChange={(expert: Expert | null) => {
          onChange(expert?.name ?? "");
          setQuery("");
        }}
        nullable
      >
        <div className="relative">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <ComboboxInput
              aria-label="Select expert"
              displayValue={(expert: Expert | null) =>
                expert ? `${expert.name} (${formatPrice(expert.price)})` : ""
              }
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => setQuery("")}
              placeholder="Search and select an expert"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-teal-400 focus:border-teal-700 focus:shadow-[0_0_0_4px_rgba(13,148,136,0.14)]"
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-4 text-teal-600">
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </ComboboxButton>
          </div>

          <ComboboxOptions className="animate-fadeIn absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_18px_40px_rgba(15,23,42,0.14)] empty:invisible">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <ComboboxOption
                  key={expert.name}
                  value={expert}
                  className="group cursor-pointer px-3 py-1 outline-none"
                >
                  {({ focus, selected }) => (
                    <div
                      className={`flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 ${
                        focus ? "bg-teal-50 text-teal-700" : "text-slate-800"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{expert.name}</p>
                        <p className="text-xs text-slate-500">{formatPrice(expert.price)}</p>
                      </div>
                      <div className="ml-3 flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 group-data-[focus]:bg-white">
                          {formatPrice(expert.price)}
                        </span>
                        {selected && <Check className="h-4 w-4 text-teal-600" />}
                      </div>
                    </div>
                  )}
                </ComboboxOption>
              ))
            ) : (
              <div className="px-4 py-4 text-sm text-slate-500">
                No experts match your search.
              </div>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
