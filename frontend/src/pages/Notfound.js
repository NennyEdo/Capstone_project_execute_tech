import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function NotFound() {
  return (
    <div className="page-shell min-h-screen bg-gray-50">
      <Navbar />
      <main className="section-container flex min-h-[calc(100vh-140px)] items-center justify-center py-16">
        <AnimatedSection className="w-full max-w-md">
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2 items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Did you forget to add the page to the router or navigate to a page that no longer exists?
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
