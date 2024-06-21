import router from "next/router";
import React from "react";
import { accessTokenAtom, sessionDataAtom } from "../../public/atoms";
import { useAtom } from "jotai";

interface BookItemProps {
  imageUrl: string;
  title: string;
  date: string;
  username: string;
  id: number;
  session: any;
}

const BookItem: React.FC<BookItemProps> = ({
  imageUrl,
  title,
  date,
  username,
  id,
  session,
}) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [sessionData, setSessionData] = useAtom(sessionDataAtom);
  const handleClick = () => {
    setSessionData(session);
    router.push({
      pathname: "/mypage/bookId",
    });
  };

  console.log(session, "session~");
  return (
    <div>
      <div
        className="w-[217px] h-[317px] relative"
        style={{ backgroundColor: "#D5C8AE", border: "1px solid gray" }}
      >
        <img
          className="z-50"
          src={imageUrl}
          alt={title}
          width={217}
          height={317}
        />
        <a className="absolute bottom-60 left-8 right-0 text-white px-2 py-1">
          {title}
        </a>
        <a className="absolute bottom-10 right-2 text-white px-2 py-1 text-[14px]">
          {username}
        </a>
      </div>
      <div
        className="mt-[20px] text-[20px] cursor-pointer"
        onClick={handleClick}
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
