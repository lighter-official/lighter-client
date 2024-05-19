import React from "react";
import Image from "next/image";
import { BadgeItemProps } from "../../interface";
import { formatDate } from "../../public/utils/utils";

export const BadgeItem: React.FC<BadgeItemProps> = ({ badge, createdAt }) => {
  return (
    <div>
      <div
        className="w-[153px] h-[154px]"
        style={{ backgroundColor: "#D5C8AE" }}
      >
        <Image
          className="z-50"
          src={badge?.imageUrl}
          width={152}
          height={153}
          alt={badge.name}
        />
      </div>
      <div className="mt-[10px] text-[36px]">{badge.name}</div>
      <div className="mt-[10px] text-[16px]" style={{ color: "#8A8170" }}>
        {formatDate(createdAt)}
      </div>
    </div>
  );
};

export default BadgeItem;
