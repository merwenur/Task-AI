export interface IRole {
    role: "User" | "Admin";
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
    role: "User" | "Admin";
  }
