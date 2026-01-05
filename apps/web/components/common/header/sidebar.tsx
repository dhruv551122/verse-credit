import { cn } from "@/lib/utils";
import { SettingsQueryResult } from "@sanity-types/sanity.types";
import { Menu, X } from "lucide-react";
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
    <div>
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
            className="duration-300 cursor-pointer hover:text-white"
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
            className="duration-300 cursor-pointer hover:text-white"
          />
        )}
      </div>
      {isMounted && (
        <div
          className={cn(
            "h-[calc(100vh-67px)] bg-chathams-blue w-full transition-transform left-0 top-[67px] duration-500 absolute -translate-x-full",
            isSidebarOpen && "translate-x-0"
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            {data.headerLinks.map((link) => (
              <Link
                href={link.url}
                key={link._key}
                className="duration-300 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
