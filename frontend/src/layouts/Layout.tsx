import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </main>
  );
};