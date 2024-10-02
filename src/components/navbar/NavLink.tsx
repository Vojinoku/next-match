"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};
export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <NavbarItem as={Link} href={href} isActive={pathname === href}>
      {label}
    </NavbarItem>
  );
}
