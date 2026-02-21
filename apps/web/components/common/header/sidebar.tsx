"use client";

import { cn } from "@/lib/utils";
import { SettingsQueryResult } from "@sanity-types/sanity.types";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const Sidebar = ({
  data,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  data: NonNullable<SettingsQueryResult>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  return (
    <>
      <div>
        {isSidebarOpen ? (
          <X
            role="button"
            onClick={() => {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              setIsSidebarOpen(false);
              timerRef.current = setTimeout(() => setIsMounted(false), 500);
            }}
            className="duration-300 cursor-pointer text-white hover:text-white/80"
          />
        ) : (
          <Menu
            role="button"
            onClick={() => {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              timerRef.current = setTimeout(() => setIsSidebarOpen(true), 10);
              setIsMounted(true);
            }}
            className="duration-300 cursor-pointer text-white hover:text-white/80"
          />
        )}
      </div>
      {isMounted && (
        <div
          className={cn(
            "h-[calc(100vh-66px)] bg-chathams-blue w-full transition-transform left-0 top-16.5 duration-500 absolute -translate-x-full",
            isSidebarOpen && "translate-x-0",
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            {data.headerLinks.map((link) => (
              <Link
                href={link.url}
                key={link._key}
                className="duration-300 text-white hover:text-white/80 py-2 text-xl group flex otems-center gap-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span>{link.label}</span>
                <span>
                  <ArrowRight className="text-white/80 duration-300 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 opacity-0" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
