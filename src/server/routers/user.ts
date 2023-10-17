import { z } from "zod";
import { procedure, router } from "../trpc";
import userModel from "models/User";
import orderModel from "models/Order";

export const userRouter = router({
    getUser: procedure
        .input(
            z.object({
                nfcId: z.string(),
            })
        )
        .output(
            z
                .object({
                    name: z.string(),
                    email: z.string(),
                })
                .nullable()
        )
        .query(async ({ input }) => {
            const user = await userModel
                .findById(input.nfcId)
                .select("-_id -__v");

            return user;
        }),
    switchTag: procedure
        .input(
            z.object({
                nfcId: z.string(),
                newId: z.string(),
            })
        )
        .output(z.boolean())
        .mutation(async ({ input }) => {
            const user = await userModel.findOne({ _id: input.nfcId });

            if (!user) return false;

            const userObj = user.toObject();

            await user.delete();

            userObj._id = input.newId;

            await new userModel(userObj).save();

            await orderModel.updateMany(
                { user: input.nfcId },
                { $set: { user: input.newId } }
            );

            return true;
        }),
    createUser: procedure
        .input(
            z.object({
                nfcId: z.string(),
                name: z.string(),
                email: z.string(),
            })
        )
        .output(z.boolean())
        .mutation(async ({ input }) => {
            const user = await userModel.findOne({ _id: input.nfcId });

            if (user) return false;

            await new userModel({
                _id: input.nfcId,
                name: input.name,
                email: input.email,
            }).save();

            return true;
        }),
});
