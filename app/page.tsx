'use client'
import Button from "@/components/atoms/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav className="border-box flex justify-between items-center m-0 px-36 py-6">
        <a href="/" className="m-0 text-green-400 text-4xl font-black">FILE TRACKA</a>

        <ul className="flex gap-8 items-center m-0">
          <a href="/" className="flex items-center justify-center px-6 py-3 bg-green-700 text-base text-gray-50 rounded">Help</a>
          <a href="/" className="flex items-center justify-center px-6 py-3 bg-green-700 text-base text-gray-50 rounded">Contact Support</a>
        </ul>
      </nav>
      <main className="flex min-h-screen flex-col items-center gap-10 px-36 mt-20">
        <h1 className="text-center text-7xl font-bold">
          <em className="not-italic text-green-400">Budget File Tracking </em>
          at Your Finger Tips
        </h1>

        <p className="text-xl px-36 text-center">Access file information, status and update actions taken from anywhere and any device</p>

        <Button onclick={() => window.location.assign('/api/auth/login')}>
          Get Started
        </Button>
      </main>
    </>
  );
}
