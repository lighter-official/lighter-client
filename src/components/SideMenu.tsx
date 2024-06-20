import { useRouter } from "next/router";
import { accessTokenAtom } from "../../public/atoms";
import { useAtom } from "jotai";

interface SideMenuProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  handleLogIn?: () => void;
  accessToken: string | null;
  loginState: { isLoggedIn: boolean };
  router: any;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  toggleMenu,
  showMenu,
  setShowMenu,
  loginState,
}) => {
  const router = useRouter();
  const [accessToken] = useAtom(accessTokenAtom);
  const isCurrentPath = (path: string) => router.pathname === path;

  return (
    <div className="lg:bg-black rounded-sm flex flex-col w-full lg:w-[400px] h-[130px] lg:h-[471px]">
      <div className="flex flex-col lg:mx-[20px]">
        <div className="text-black lg:text-white lg:mt-[34px] mt-[20px] w-full lg:h-[51px] h-[40px] text-[25px] lg:text-[36px] font-bold lg:font-normal">
          나의 보관함
        </div>
        <div className="flex flex-col lg:gap-y-[26px] mt-[24px]">
          <div
            className="hidden lg:flex text-[20px] cursor-pointer"
            style={{ color: "#CEB292" }}
            onClick={() =>
              router.push({
                pathname: "/mypage/badgeList",
                query: { access_token: accessToken },
              })
            }
          >
            나의 뱃지
          </div>
          <div
            className="hidden lg:flex text-[20px] cursor-pointer"
            style={{ color: "#CEB292" }}
            onClick={() =>
              router.push({
                pathname: "/mypage/finished",
                query: { access_token: accessToken },
              })
            }
          >
            내가 발행한 책
          </div>
          <div
            className="flex text-[20px] font-normal lg:font-bold cursor-pointer"
            style={{ color: "#CEB292" }}
            onClick={() =>
              router.push({
                pathname: "/mypage/unfinished",
                query: { access_token: accessToken },
              })
            }
          >
            못다쓴 책
          </div>
          <hr
            className="block lg:hidden w-full bg-[#7C766C] h-[1px] mt-2"
            style={{ color: "#7C766C", borderColor: "#7C766C" }}
          />
          <div
            className="hidden lg:flex text-[20px] cursor-pointer"
            style={{ color: "#CEB292" }}
            onClick={() =>
              router.push({
                pathname: "/mypage/change-settings",
                query: { access_token: accessToken },
              })
            }
          >
            설정
          </div>
        </div>
      </div>
    </div>
  );
};
