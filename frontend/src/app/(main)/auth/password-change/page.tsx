"use client";

import { useResetPasswordForm } from "@/app/forms/userForms";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const restPasswordForm = useResetPasswordForm();
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
      <Card className="w-full lg:w-[450px]">
        <CardHeader>
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your new password below
          </p>
        </CardHeader>
        <CardContent>
          <Form {...restPasswordForm}>
            <form
              onSubmit={restPasswordForm.handleSubmit((data) => {
                resetPassword.trigger({
                  newPassword: data.newPassword,
                  token: searchParams.get("hash") as string,
                });
              })}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <FormField
                  control={restPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} 
                        type="password"
                        id="newPassword" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
