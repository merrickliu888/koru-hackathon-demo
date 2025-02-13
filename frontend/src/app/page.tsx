"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/teacher-dashboard")}>Teacher Dashboard</Button>
    </div>
  );
}
