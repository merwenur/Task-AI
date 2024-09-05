import { Role, User } from "@prisma/client";
import { eventEmitter } from "@utils/event.emitter";

eventEmitter.on("onUserRoleUpdated", async ({user, role}) => {
    // TODO: Add logic here e.g. send notification to user and admin
});