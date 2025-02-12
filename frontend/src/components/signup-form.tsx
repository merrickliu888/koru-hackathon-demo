"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [schoolDistrict, setSchoolDistrict] = useState("");
  const [details, setDetails] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, schoolDistrict, details);
    router.push("/dashboard");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>Fill out the form below to get started, and we&apos;ll contact you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">School District</Label>
                <Input
                  id="details"
                  type="text"
                  placeholder="Enter additional details"
                  required
                  value={schoolDistrict}
                  onChange={(e) => setSchoolDistrict(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Input
                  id="details"
                  type="text"
                  placeholder="Enter additional details"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
