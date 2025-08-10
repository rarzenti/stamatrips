"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isHome) return null;

  return (
    <>
      <nav className="bg-white shadow p-4 flex items-center justify-center gap-8 sticky top-0 z-50">
        <Link href="/" className="text-xl hover:underline text-sky-700">🏠</Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xl hover:underline text-sky-700"
        >
          🌞
        </button>
        <Link href="/winter" className="text-xl hover:underline text-sky-700">❄️</Link>
        {/* Weddings section removed */}
      </nav>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-80 space-y-4 text-center">
            <Dialog.Title className="text-2xl font-bold text-sky-700">Summer Trips</Dialog.Title>
            <Link
              href="/summer/2025"
              className="block text-blue-600 hover:underline text-lg"
              onClick={() => setIsModalOpen(false)}
            >
              OCNJ 2025
            </Link>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
