import { User } from "@/schemas/User.schema";
import { UserBadge } from "@/schemas/UserBadge.schema";
import { WritingSession } from "@/schemas/WritingSession.schema";
import { Response } from "./api.types";

export type GetUserInfoData = User & { userBadges: UserBadge[] } & {
  writingSessions: WritingSession[];
};
export type GetUserInfoResponse = Response<GetUserInfoData>;
