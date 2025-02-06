import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, CalendarCheck } from "lucide-react";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <LandingPageHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Substitute Teacher Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Find, manage, and onboard substitute teachers with ease. Save time and ensure seamless classroom
                  continuity.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <Search className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Quick Search</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Find qualified substitute teachers in your area with our advanced search tool.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <UserPlus className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Easy Onboarding</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Streamline the onboarding process for new substitute teachers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <CalendarCheck className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Scheduling</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Manage substitute teacher schedules and assignments effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <ol className="grid gap-6 md:grid-cols-3">
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </span>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Create an account for your school or district.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </span>
                <h3 className="text-xl font-bold">Find Substitutes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Search and connect with qualified substitute teachers.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </span>
                <h3 className="text-xl font-bold">Manage Assignments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easily assign and track substitute teacher placements.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up for a free trial or contact us for more information.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          © 2024 SubstituteSync. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
