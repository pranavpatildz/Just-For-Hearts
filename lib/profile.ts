"use client";

import { auth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

type ProfileSeed = {
  mobile?: string | null;
  email?: string | null;
  fullName?: string | null;
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

function normalizeE164Phone(phone?: string | null) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (phone.startsWith("+") && digits.length >= 10) return `+${digits}`;
  return phone.trim();
}

function normalizeLegacyPhone(phone?: string | null) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits.slice(2);
  return digits.slice(-10);
}

function mapRowToProfile(row: Record<string, unknown>): AppProfile {
  const phoneValue =
    typeof row.phone === "string" && row.phone.trim()
      ? row.phone.trim()
      : typeof row.mobile === "string"
        ? normalizeE164Phone(row.mobile)
        : "";
  const legacyMobile =
    typeof row.mobile === "string" && row.mobile.trim()
      ? row.mobile.trim()
      : normalizeLegacyPhone(phoneValue);

  return {
    mobile: legacyMobile,
    full_name: typeof row.full_name === "string" ? row.full_name : null,
    email: typeof row.email === "string" ? row.email : null,
    city: typeof row.city === "string" ? row.city : null,
    language: typeof row.language === "string" ? row.language : null,
    source: typeof row.source === "string" ? row.source : null,
    created_at: typeof row.created_at === "string" ? row.created_at : null,
  };
}

function buildDefaultProfile(seed: ProfileSeed): AppProfile | null {
  const e164Phone = normalizeE164Phone(seed.mobile);
  const mobile = normalizeLegacyPhone(seed.mobile);

  if (!e164Phone || !mobile) {
    return null;
  }

  return {
    mobile,
    full_name: seed.fullName?.trim() || null,
    email: seed.email?.trim() || null,
    city: null,
    language: null,
    source: null,
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
  const e164Phone = normalizeE164Phone(seed.mobile);

  if (!profile || !e164Phone) {
    throw new Error("A valid mobile number is required to create a profile.");
  }

  let data: Record<string, unknown> | null = null;
  let error: Error | null = null;

  const phoneFirst = await supabase
    .from("users")
    .upsert(
      [
        {
          phone: e164Phone,
          mobile: profile.mobile,
          full_name: profile.full_name,
          email: profile.email,
        },
      ],
      { onConflict: "phone" }
    )
    .select("*")
    .single();

  if (phoneFirst.error) {
    const mobileFallback = await supabase
      .from("users")
      .upsert(
        [
          {
            mobile: profile.mobile,
            full_name: profile.full_name,
            email: profile.email,
          },
        ],
        { onConflict: "mobile" }
      )
      .select("*")
      .single();

    data = mobileFallback.data as Record<string, unknown> | null;
    error = mobileFallback.error;
  } else {
    data = phoneFirst.data as Record<string, unknown> | null;
  }

  if (error) {
    throw error;
  }

  return data ? mapRowToProfile(data) : profile;
}

export async function getOrCreateUserProfile(seed: ProfileSeed) {
  const authUser = await getAuthenticatedSupabaseUser();
  const firebasePhone = auth?.currentUser?.phoneNumber ?? null;
  const phone = normalizeE164Phone(firebasePhone || seed.mobile);
  const legacyPhone = normalizeLegacyPhone(firebasePhone || seed.mobile);
  const normalizedEmail = seed.email?.trim() || authUser?.email?.trim() || "";
  console.log("Phone from Firebase:", phone);

  if (phone) {
    const phoneResult = await supabase.from("users").select("*").eq("phone", phone).maybeSingle();
    if (!phoneResult.error && phoneResult.data) {
      console.log("DB result:", phoneResult.data);
      return mapRowToProfile(phoneResult.data as Record<string, unknown>);
    }

    const phoneFallbackResult = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone.replace("+91", ""))
      .maybeSingle();
    if (!phoneFallbackResult.error && phoneFallbackResult.data) {
      console.log("DB result:", phoneFallbackResult.data);
      return mapRowToProfile(phoneFallbackResult.data as Record<string, unknown>);
    }
  }

  if (legacyPhone) {
    const legacyMobileResult = await supabase
      .from("users")
      .select("*")
      .eq("mobile", legacyPhone)
      .maybeSingle();
    if (!legacyMobileResult.error && legacyMobileResult.data) {
      console.log("DB result:", legacyMobileResult.data);
      return mapRowToProfile(legacyMobileResult.data as Record<string, unknown>);
    }
  }

  if (normalizedEmail) {
    const emailResult = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();
    if (!emailResult.error && emailResult.data) {
      console.log("DB result:", emailResult.data);
      return mapRowToProfile(emailResult.data as Record<string, unknown>);
    }
  }

  console.log("DB result:", null);

  return upsertUserProfile({
    mobile: phone || legacyPhone || null,
    email: normalizedEmail || null,
    fullName: seed.fullName ?? authUser?.user_metadata?.full_name ?? null,
  });
}
