import { router } from "../trpc";
import { userRouter } from "./user";
import { orderRouter } from "./order";

export const appRouter = router({
    user: userRouter,
    order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
