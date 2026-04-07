"use client";

import { auth } from "@/lib/firebase";
import { normalizePhoneNumber } from "@/lib/phone";
import { supabase } from "@/lib/supabase";

type ProfileSeed = {
  mobile?: string | null;
  email?: string | null;
  fullName?: string | null;
  city?: string | null;
  language?: string | null;
  source?: string | null;
};

export type AppProfile = {
  mobile: string;
  full_name: string | null;
  email: string | null;
  city: string | null;
  language: string | null;
  source: string | null;
  created_at?: string | null;
};

function mapRowToProfile(row: Record<string, unknown>): AppProfile {
  const mobile =
    typeof row.mobile === "string" && row.mobile.trim()
        ? normalizePhoneNumber(row.mobile)
      : typeof row.phone === "string" && row.phone.trim()
        ? normalizePhoneNumber(row.phone)
        : "";

  return {
    mobile,
    full_name: typeof row.full_name === "string" ? row.full_name : null,
    email: typeof row.email === "string" ? row.email : null,
    city: typeof row.city === "string" ? row.city : null,
    language: typeof row.language === "string" ? row.language : null,
    source: typeof row.source === "string" ? row.source : null,
    created_at: typeof row.created_at === "string" ? row.created_at : null,
  };
}

function buildDefaultProfile(seed: ProfileSeed): AppProfile | null {
  const formattedPhone = normalizePhoneNumber(seed.mobile ?? "");

  if (!formattedPhone.startsWith("+91")) {
    return null;
  }

  return {
    mobile: formattedPhone,
    full_name: seed.fullName?.trim() || null,
    email: seed.email?.trim() || null,
    city: seed.city?.trim() || null,
    language: seed.language?.trim() || null,
    source: seed.source?.trim() || null,
    created_at: null,
  };
}

export async function getAuthenticatedSupabaseUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function upsertUserProfile(seed: ProfileSeed) {
  const profile = buildDefaultProfile(seed);

  if (!profile) {
    throw new Error("A valid mobile number is required to create a profile.");
  }

  console.log("Formatted phone:", profile.mobile);

  const { data, error } = await supabase
    .from("users")
    .upsert([
      {
        mobile: profile.mobile,
        full_name: profile.full_name,
        email: profile.email,
        city: profile.city,
        language: profile.language,
        source: profile.source,
      },
    ], { onConflict: "mobile" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data ? mapRowToProfile(data as Record<string, unknown>) : profile;
}

export async function getOrCreateUserProfile(seed: ProfileSeed) {
  const authUser = await getAuthenticatedSupabaseUser();
  const rawPhone = auth?.currentUser?.phoneNumber || seed.mobile || "";
  const formattedPhone = normalizePhoneNumber(rawPhone);

  console.log("Firebase phone:", rawPhone);
  console.log("Formatted phone:", formattedPhone);

  if (formattedPhone.startsWith("+91")) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("mobile", formattedPhone)
      .maybeSingle();

    if (error) {
      throw error;
    }

    console.log("DB result:", data);

    if (data) {
      return mapRowToProfile(data as Record<string, unknown>);
    }
  }

  console.log("DB result:", null);

  return upsertUserProfile({
    mobile: formattedPhone || normalizePhoneNumber(authUser?.phone || ""),
    email: seed.email?.trim() || authUser?.email?.trim() || null,
    fullName: seed.fullName ?? authUser?.user_metadata?.full_name ?? null,
    city: seed.city ?? null,
    language: seed.language ?? null,
    source: seed.source ?? null,
  });
}
