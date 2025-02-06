import { LandingPageHeader } from "@/components/landing-page-header";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <LandingPageHeader />
      <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
        <SignupForm />
      </div>
    </div>
  );
}
