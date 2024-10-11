"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import React from "react";
import { calculateAge, transformImageUrl } from "../lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Member } from "@prisma/client";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

export default function MemberSidebar({ member, navLinks }: Props) {
  const pathname = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={transformImageUrl(member.image) || "/images/user.png"}
        alt="User profile main image"
        className="rounded-full mt-6 aspect-square object-cover"
      ></Image>
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.name},{calculateAge(member.dateOfBirth)}
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="felx flex-col p-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`block rounded ${
                pathname == link.href
                  ? "text-secondary-500"
                  : "hover:text-secondary/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="secondary"
          variant="bordered"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
}
