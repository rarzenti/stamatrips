"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import fs from "fs";
import path from "path";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    // Dynamically import years from the summer content folder
    async function fetchYears() {
      try {
        const res = await fetch("/api/summer-years");
        const data = await res.json();
        setYears(data.years);
      } catch (e) {
        setYears(["2025"]); // fallback
      }
    }
    if (isOpen) fetchYears();
  }, [isOpen]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-sky-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-sky-700">Stamatakis Family Trips</h1>

      <div className="grid gap-6 w-full max-w-md">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-lg text-xl font-semibold shadow"
        >
          🌞 View Summer Trips
        </button>
        <Link
          href="/winter"
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-4 rounded-lg text-xl text-center font-semibold shadow"
        >
          ❄️ View Winter Trips
        </Link>
        {/* Weddings section removed */}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-80 space-y-4 text-center">
            <Dialog.Title className="text-2xl font-bold text-sky-700">Summer Trips</Dialog.Title>
            {years.length === 0 ? (
              <div className="text-gray-500">No years found</div>
            ) : (
              years.map((year) => (
                <Link
                  key={year}
                  href={`/summer/${year}`}
                  className="block text-blue-600 hover:underline text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {year}
                </Link>
              ))
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}