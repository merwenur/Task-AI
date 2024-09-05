"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  userCreateSchemaWithConfirm,
  userLoginSchema,
} from "../../../../shared/schemas/userSchema";
import { z } from "zod";
import { resetPasswordSchema } from '../../../../shared/schemas/userSchema';

export const useRegisterForm = () => {
  return useForm<z.infer<typeof userCreateSchemaWithConfirm>>({
    resolver: zodResolver(userCreateSchemaWithConfirm),
  });
};

export const useLoginForm = () => {
  return useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
  });
};

export const useForgotPasswordForm = () => {
  return useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });
};

export const useResetPasswordForm = () => {
  return useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });
};
