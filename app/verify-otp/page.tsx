import { Suspense } from "react";

import VerifyOtpClient from "./VerifyOtpClient";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB]" />}>
      <VerifyOtpClient />
    </Suspense>
  );
}
