"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import Navbar from "@/components/public/Navbar";
import { SOURCE_OPTIONS } from "@/constants/sourceOptions";
import { supabase } from "@/lib/supabase";
import { getUser, logout, setUser } from "@/src/lib/client-auth";

type User = {
  mobile: string;
  name: string;
  email: string;
  city?: string;
  language?: string;
  source?: string;
  created_at?: string;
};

type EditForm = {
  name: string;
  email: string;
  city: string;
  language: string;
  source: string;
};

type DropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  searchable?: boolean;
  onChange: (value: string) => void;
};

const maharashtraCities = [
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad",
  "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli",
  "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar",
  "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna",
  "Bhusawal", "Panvel", "Satara", "Beed", "Yavatmal",
  "Kamptee", "Gondia", "Barshi", "Achalpur", "Osmanabad",
  "Nandurbar", "Wardha", "Udgir", "Hinganghat",
];

const languages = ["English", "Hindi", "Marathi"];

function formatValue(value?: string | null) {
  return value && value.trim() ? value : "Not Set";
}

function formatJoinedOn(value?: string) {
  if (!value) return "Not Set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not Set";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function CustomDropdown({
  label,
  placeholder,
  value,
  options,
  searchable = false,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [options, query, searchable]);

  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="relative mt-2" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 origin-top rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          {searchable && (
            <div className="border-b border-gray-100 p-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}`}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition-all duration-200 hover:border-red-400 focus:ring-2 focus:ring-red-400"
              />
            </div>
          )}

          <div className="max-h-60 overflow-y-auto scroll-smooth py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full cursor-pointer px-4 py-2 text-left transition-colors ${
                    value === option
                      ? "bg-red-100 text-red-700"
                      : "text-gray-700 hover:bg-red-50"
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No results found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<EditForm>({
    name: "",
    email: "",
    city: "",
    language: "",
    source: "",
  });

  useEffect(() => {
    const storedUser = getUser();

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const normalizedUser = storedUser as User;
    setUserState(normalizedUser);
    setForm({
      name: normalizedUser.name ?? "",
      email: normalizedUser.email ?? "",
      city: normalizedUser.city ?? "",
      language: normalizedUser.language ?? "",
      source: normalizedUser.source ?? "",
    });

    const loadProfile = async () => {
      const { data } = await supabase
        .from("users")
        .select("mobile, full_name, email, city, language, source, created_at")
        .eq("mobile", normalizedUser.mobile)
        .maybeSingle();

      if (!data) return;

      const mergedUser: User = {
        ...normalizedUser,
        mobile: data.mobile ?? normalizedUser.mobile,
        name: data.full_name ?? normalizedUser.name,
        email: data.email ?? normalizedUser.email,
        city: data.city ?? normalizedUser.city ?? "",
        language: data.language ?? normalizedUser.language ?? "",
        source: data.source ?? normalizedUser.source ?? "",
        created_at: data.created_at ?? normalizedUser.created_at,
      };

      setUserState(mergedUser);
      setForm({
        name: mergedUser.name ?? "",
        email: mergedUser.email ?? "",
        city: mergedUser.city ?? "",
        language: mergedUser.language ?? "",
        source: mergedUser.source ?? "",
      });
      setUser(mergedUser);
    };

    void loadProfile();
  }, [router]);

  const initials = useMemo(() => {
    if (!user?.name) return "J";
    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user?.name]);

  const detailItems = [
    { label: "Full Name", value: formatValue(user?.name) },
    { label: "Mobile Number", value: formatValue(user?.mobile) },
    { label: "Email Address", value: formatValue(user?.email) },
    { label: "City", value: formatValue(user?.city) },
    { label: "Preferred Language", value: formatValue(user?.language) },
    { label: "Source", value: formatValue(user?.source) },
    { label: "Joined On", value: formatJoinedOn(user?.created_at) },
  ];

  function handleFormChange(field: keyof EditForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveProfile() {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: form.name.trim() || "User",
      email: form.email.trim(),
      city: form.city.trim(),
      language: form.language.trim(),
      source: form.source.trim(),
    };

    const { error } = await supabase.from("users").upsert(
      [
        {
          mobile: user.mobile,
          full_name: updatedUser.name,
          email: updatedUser.email || null,
          city: updatedUser.city || null,
          language: updatedUser.language || null,
          source: updatedUser.source || null,
        },
      ],
      { onConflict: "mobile" }
    );

    if (error) {
      console.error("Profile update error:", error);
      return;
    }

    setUserState(updatedUser);
    setUser(updatedUser);
    setEditMode(false);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F9FAFB]">
      <Navbar />
      <main className="mx-auto mt-10 max-w-4xl px-4 pb-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="bg-gradient-to-r from-rose-600 to-red-600 px-4 py-6 md:h-[90px] md:px-6 md:py-8">
            <div className="md:hidden">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditMode((prev) => !prev)}
                  className="rounded-full border border-white px-3 py-1 text-xs text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => router.push("/get-started?from=dashboard")}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-red-500"
                >
                  Book
                </button>
                <button
                  onClick={() => logout("/create-account")}
                  className="rounded-full bg-red-400 px-3 py-1 text-xs text-white"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="hidden items-center justify-between md:flex">
              <div />
              <div className="flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex-nowrap">
              <button
                onClick={() => setEditMode((prev) => !prev)}
                className="max-w-full whitespace-nowrap rounded-lg border border-white bg-transparent px-3 py-1.5 text-xs text-white transition hover:scale-105 sm:text-sm md:px-4"
              >
                <span className="hidden sm:inline">
                  {editMode ? "Cancel Edit" : "Edit Profile"}
                </span>
                <span className="sm:hidden">{editMode ? "Cancel" : "Edit"}</span>
              </button>
              <button
                onClick={() => router.push("/get-started?from=dashboard")}
                className="max-w-full whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs text-red-600 transition hover:scale-105 sm:text-sm md:px-4"
              >
                <span className="hidden sm:inline">Book Service</span>
                <span className="sm:hidden">Book</span>
              </button>
              <button
                onClick={() => logout("/create-account")}
                className="max-w-full whitespace-nowrap rounded-lg bg-red-400 px-3 py-1.5 text-xs text-white transition hover:scale-105 sm:text-sm md:px-4"
              >
                Logout
              </button>
              </div>
            </div>
          </div>

          <div className="pb-6">
            <div className="md:hidden">
              <div className="relative">
                <div className="absolute -top-8 left-4 z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-lg font-semibold text-[#0B1B2B] shadow-lg">
                    {initials}
                  </div>
                </div>
              </div>

              <div className="rounded-b-2xl bg-white px-4 pb-4 pt-10">
                <div className="mt-2">
                  <h2 className="text-lg font-semibold text-[#0B1B2B]">
                    {formatValue(user?.name)}
                  </h2>
                  <p className="text-sm text-gray-500">Patient Portal</p>
                </div>
              </div>
            </div>

            <div className="hidden flex-col items-center gap-4 px-4 text-center md:flex md:flex-row md:items-center md:px-6 md:text-left">
              <div className="flex h-20 w-20 -mt-10 items-center justify-center rounded-full border-4 border-white bg-[#F9FAFB] text-xl font-semibold text-[#0B1B2B] shadow-md">
                {initials}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0B1B2B] md:text-2xl">
                  {formatValue(user?.name)}
                </h2>
                <p className="text-sm text-gray-500 md:text-base">Patient Portal</p>
              </div>
              <div className="md:ml-auto">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                  Active Member
                </span>
              </div>
            </div>

            {editMode && (
              <div className="mt-6 px-4 md:px-6">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-gray-500 md:text-base">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 md:text-base">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
                      />
                    </div>
                    <CustomDropdown
                      label="City"
                      placeholder="Select City"
                      value={form.city}
                      options={maharashtraCities}
                      searchable
                      onChange={(value) => handleFormChange("city", value)}
                    />
                    <CustomDropdown
                      label="Preferred Language"
                      placeholder="Select Language"
                      value={form.language}
                      options={languages}
                      onChange={(value) => handleFormChange("language", value)}
                    />
                    <CustomDropdown
                      label="Source"
                      placeholder="Select Source"
                      value={form.source}
                      options={SOURCE_OPTIONS}
                      onChange={(value) => handleFormChange("source", value)}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="mt-3 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 md:mt-0 md:w-auto md:py-1.5"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-6">
              {detailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm md:p-6"
                >
                  <p className="mb-1 text-sm text-gray-500 md:text-base">{item.label}</p>
                  <p className="text-base font-medium text-gray-800 md:text-lg">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 px-4 md:px-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] md:text-xl">
                Your Active Plans & History
              </h3>
              <div className="mt-4 rounded-2xl border-2 border-dashed border-gray-200 p-6 text-gray-500">
                No active plans found. Click 'Book Service' to start.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
