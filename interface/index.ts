export interface WritingData {
  code: string;
  data: {
    createdAt: string;
    finishDate: string;
    id: number;
    isActivated: boolean;
    modifyingCount: number;
    nearestFinishDate: string;
    nearestStartDate: string;
    page: number;
    period: number;
    progressPercentage: number;
    progressStep: number;
    startAt: { hour: number; minute: number };
    startDate: string;
    status: string;
    subject: string;
    updatedAt: string;
    userId: string;
    writingHours: number;
    writings: any[]; // writings 데이터 형식이 제공되지 않아서 임시로 any[] 사용
  };
  statusCode: number;
  success: boolean;
}

export interface SettingData {
  subject: string;
  period: number;
  page: number;
  startAt: { hour: number; minute: number | undefined };
  writingHours: number;
}

export interface Badge {
  badgeId: number;
  createdAt: string;
  id: number;
  userId: string;
}

export interface BadgeItemProps {
  badge: {
    condition: string;
    description: string;
    id: number;
    imageUrl: string;
    name: string;
  };
  badgeId: number;
  createdAt: string;
  id: string;
  userId: string;
}

export interface UserInfo {
  code: string;
  data: {
    createdAt: string;
    encryptedPassword: string | null;
    id: string;
    nickname: string;
    providerType: string;
    updatedAt: string;
    userBadges: Badge[];
    writingSessions: WritingData[];
  };
  statusCode: number;
  success: boolean;
}

export interface PostingInfo {
  code: string;
  data: {
    count: number;
    newBadges: Badge[];
    createdAt: string;

    id: string;
    nickname: string;
    providerType: string;
    updatedAt: string;
    userBadges: Badge[];
    writingSessions: WritingData[];
  };
  statusCode: number;
  success: boolean;
}

export interface NewWritingData {
  title: string;
  content: string;
}

export interface EditOrSetData {
  subject: string;
  period: number;
  page: number;
  startAt: { hour: number; minute: number | undefined };
  writingHours: number;
}

export type MiniFunctionType = (value: boolean) => void;
export type RemainingTimeType = string | number;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  writingData: WritingData;
  remainingTime?: RemainingTimeType;
  textColor?: boolean;
  mini?: MiniFunctionType;
  remainingSecond?: RemainingTimeType;
  remainingTime2?: RemainingTimeType;
  postedWriting: PostingInfo;
  setPostedWriting: React.Dispatch<React.SetStateAction<PostingInfo>>;
}
