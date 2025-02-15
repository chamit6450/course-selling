"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(); // Get current path
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-gray-400 text-sm flex items-center space-x-2">
      <Link href="/" className="text-gray-300 hover:text-white">🏠 Home</Link>
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={href} className="flex items-center space-x-2">
            <span>›</span>
            {isLast ? (
              <span className="text-gray-200 font-semibold">{decodeURIComponent(segment)}</span>
            ) : (
              <Link href={href} className="hover:text-white">{decodeURIComponent(segment)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
