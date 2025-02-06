import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

export function LandingPageHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" href="/">
        <School className="h-6 w-6 mr-2" />
        <span className="font-bold">Relay</span>
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button size="sm">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
