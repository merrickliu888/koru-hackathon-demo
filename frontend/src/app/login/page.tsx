import { LandingPageHeader } from "@/components/landing-page-header";
import { LoginForm } from "@/components/login-form";
export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <LandingPageHeader />
      <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
        <LoginForm />
      </div>
    </div>
  );
}
