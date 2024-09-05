"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useSWRMutation, { SWRMutationResponse } from "swr/mutation";
import { axiosInstance } from "@/lib/utils";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  userCreateSchema,
  userLoginSchema,
} from "../../../../shared/schemas/userSchema";
import { ApiResponseOptions } from "../../../../shared/types/responseType";
import { IUser } from "../../../../shared/types/userTypes";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

type AuthContextType = {
  login: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<IUser>>,
    ApiResponseOptions,
    "/auth/login",
    z.infer<typeof userLoginSchema>
  >;

  register: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<IUser>>,
    any,
    "/auth/register",
    z.infer<typeof userCreateSchema>
  >;
  forgotPassword: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<void>>,
    ApiResponseOptions,
    "/auth/forgot-password",
    z.infer<typeof forgotPasswordSchema>
  >;
  resetPassword: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<void>>,
    ApiResponseOptions,
    "/auth/reset-password-with-token",
    z.infer<typeof resetPasswordSchema> & { token: string }
  >;
  confirmEmail: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<void>>,
    ApiResponseOptions,
    "/auth/confirm-email",
    { token: string }
  >;
  logout: SWRMutationResponse<
    AxiosResponse<ApiResponseOptions<void>>,
    any,
    "/auth/logout",
    never
  >;
  user?: IUser;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState();
  const navigation = useRouter();
  const login = useSWRMutation(
    "/auth/login",
    async function createUser(
      url,
      { arg }: { arg: z.infer<typeof userLoginSchema> }
    ): Promise<AxiosResponse<ApiResponseOptions<IUser>>> {
      return axiosInstance.post(url, arg);
    },
    {
      onSuccess: (res) => {
        if (res?.data?.data?.id) {
          localStorage.setItem("userId", res?.data?.data?.id?.toString());
        }

        navigation.push("/dashboard");
      },
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  const register = useSWRMutation(
    "/auth/register",
    async function createUser(
      url,
      { arg }: { arg: z.infer<typeof userCreateSchema> }
    ): Promise<AxiosResponse<ApiResponseOptions<IUser>>> {
      return axiosInstance.post(url, arg);
    },
    {
      onSuccess: (res) => {
        toast.success(
          "User created successfully. Please check your email to confirm your account. Redirecting to login page..."
        );
        setTimeout(() => {
          navigation.push("/login");
        }, 2000);
      },
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const logout = useSWRMutation(
    "/auth/logout",
    async function logout(
      url
    ): Promise<AxiosResponse<ApiResponseOptions<void>>> {
      return axiosInstance.post(url);
    },
    {
      onSuccess: () => {
        toast.success("Logged out successfully.");
        navigation.push("/login");
      },
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const sendPasswordResetEmail = useSWRMutation(
    "/auth/forgot-password",
    async function sendPasswordResetEmail(
      url,
      { arg }: { arg: z.infer<typeof forgotPasswordSchema> }
    ): Promise<AxiosResponse<ApiResponseOptions<void>>> {
      return axiosInstance.post(url, arg);
    },
    {
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
      onSuccess: () => {
        toast.success("Password reset email sent. Please check your email.");
      },
    }
  );

  const resetPassword = useSWRMutation(
    "/auth/reset-password-with-token",
    async function resetPassword(
      url,
      {
        arg,
      }: {
        arg: z.infer<typeof resetPasswordSchema> & {
          token: string;
        };
      }
    ): Promise<AxiosResponse<ApiResponseOptions<void>>> {
      return axiosInstance.post(url, arg);
    },
    {
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
      onSuccess: () => {
        toast.success(
          "Password reset successfully. Redirecting to login page..."
        );
        setTimeout(() => {
          navigation.push("/login");
        }, 2000);
      },
    }
  );

  const confirmEmail = useSWRMutation(
    "/auth/confirm-email",
    async function confirmEmail(
      url,
      { arg }: { arg: { token: string } }
    ): Promise<AxiosResponse<ApiResponseOptions<void>>> {
      return axiosInstance.get(url + "?token=" + arg.token);
    },
    {
      onError(err, key, config) {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        forgotPassword: sendPasswordResetEmail,
        resetPassword: resetPassword,
        confirmEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access the authentication functionalities.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
