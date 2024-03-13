export type User = {
  id: string;
  nickname?: string;
  createdAt: Date;
  updatedAt: Date;
  providerType: ProviderType;
  encryptedPassword?: string | null;
};

export type ProviderType = "kakao" | "google" | "test";
