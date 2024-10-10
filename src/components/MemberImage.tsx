"use client";
import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-xl"
        />
      ) : (
        <Image
          width={265}
          height={265}
          src={photo?.url || "/images/user.png"}
          alt="Image of User"
        />
      )}
    </div>
  );
}
