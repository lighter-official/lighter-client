import router from "next/router";
import React from "react";
import { accessTokenAtom } from "../../public/atoms";
import { useAtom } from "jotai";

interface BookItemProps {
  imageUrl: string;
  title: string;
  date: string;
}

const BookItem: React.FC<BookItemProps> = ({ imageUrl, title, date }) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  return (
    <div>
      <div
        className="w-[217px] h-[298px]"
        style={{ backgroundColor: "#D5C8AE", border: "1px solid gray" }}
      >
        <img className="z-50" src={imageUrl} alt={title} />
      </div>
      <div
        className="mt-[10px] text-[20px] cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/mypage/bookId", //수정 필요
            query: { access_token: accessToken },
          })
        }
      >
        {title}
      </div>
      <div className="mt-[10px] text-[16px]" style={{ color: "#8A8170" }}>
        {date}
      </div>
    </div>
  );
};

export default BookItem;
