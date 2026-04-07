import { Suspense } from "react";

import CreateAccountClient from "./CreateAccountClient";

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB]" />}>
      <CreateAccountClient />
    </Suspense>
  );
}
