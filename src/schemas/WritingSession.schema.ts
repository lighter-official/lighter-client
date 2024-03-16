export type WritingSession = {
  id: number;
  userId: string;
  subject: string;
  period: number;
  page: number;
  startAt: WritingSessionStartAt;
  writingHours: number;
  status: WritingSessionStatus;
  isActivated: Boolean;
  modifyingCount: number;
  progressStep: number;
  progressPercentage: number;
  startDate: Date;
  finishDate: Date;
  nearestStartDate: Date;
  nearestFinishDate: Date;

  createdAt: Date;
  updatedAt: Date;
};

export type WritingSessionStartAt = { hour: number; minute: number };

export type WritingSessionStatus = "onProcess" | "aborted" | "completed";
