import { AuthService } from "@features/auth/auth.service";
import { User } from "@prisma/client";
import { eventEmitter } from "@utils/event.emitter";
import SocketService from "@utils/socket.service";

eventEmitter.on("onUserRegistered", async (user: User) => {
    console.log("User registered: ", user);
    const authService = new AuthService();
    await authService.sendActivationEmail(user);
});

eventEmitter.on("onActivationEmailSent", async (user: User) => {
    // TODO: Add activation email sent logic here e.g. send notification to user
});

eventEmitter.on("onEmailConfirmed", async (user: User) => {
    // TODO: Add email confirmed logic here e.g. welcome email
});

eventEmitter.on("onUserLoggedIn", (user: User) => {
    SocketService.getInstance().sendMessageToUser(user.id, "notification", "User logged in");
});

eventEmitter.on("onResetPasswordEmailSent", async (user: User) => {
    // TODO: Add reset password email sent logic here e.g. send notification to user
});

eventEmitter.on("onProfileViewed", async (user: User) => {
    // TODO: Add profile viewed logic here e.g. increase profile views count
});

eventEmitter.on("onProfileUpdated", async (user: User) => {
    // TODO: Add profile updated logic here e.g. send notification to user
});

eventEmitter.on("onEmailUpdateRequested", async (user: User) => {
    // TODO: Add email update requested logic here e.g. send notification to user
});

eventEmitter.on("onEmailUpdateConfirmed", async (user: User) => {
    // TODO: Add email update confirmed logic here e.g. send notification to user
});