import { Suspense } from "react";

import GetStartedClient from "./GetStartedClient";

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <GetStartedClient />
    </Suspense>
  );
}
