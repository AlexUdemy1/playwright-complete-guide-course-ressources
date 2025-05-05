// components/ActiveLink.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  activeClassName: string;
  className?: string;
  onClick?: () => void;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  activeClassName,
  className = "",
  onClick,
}) => {
  const pathname = usePathname(); // Get the current path
  const isActive = pathname === href;

  const combinedClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className;

  return (
    <Link href={href} className={combinedClassName} onClick={onClick}>
      {children}
    </Link>
  );
};

export default ActiveLink;
