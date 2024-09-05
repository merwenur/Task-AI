import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userCreateSchemaWithConfirm = userCreateSchema
  .extend({
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
})

export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
})

export const userEmailUpdateSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const emailConfirmationSchema = z.object({
  token: z.string(),
});

export const updateUserRoleSchema = z.object({
  userId: z.number(),
  role: z.enum(['Admin', 'User']),
})




