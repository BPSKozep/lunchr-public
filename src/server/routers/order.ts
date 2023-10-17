import { z } from "zod";
import { procedure, router } from "../trpc";
import orderModel from "models/Order";
import userModel, { IUser } from "models/User";
import { getWeek, getWeekYear } from "utils/isoweek";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

export const orderRouter = router({
    getOrder: procedure
        .input(
            z.object({
                nfcId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const currentDate = new Date();

            const year = getWeekYear(currentDate);
            const week = getWeek(currentDate);

            const today = days[currentDate.getDay() - 1];

            const order = await orderModel
                .findOne({
                    user: input.nfcId,
                    year: year,
                    weekNumber: week,
                })
                .populate<{ user: IUser }>("user")
                .select("-_id -__v");

            let user: IUser | null = null;
            let orderToday: string | null = null;
            let failure = false;

            if (!today) {
                return {
                    user: null,
                    order: null,
                    failure: true,
                };
            }

            if (order) {
                user = order.user;

                if (order.order[today].completed) {
                    orderToday = `${process.env.ALREADY_CLAIMED_TEXT} (${order.order[today].chosen})`;

                    failure = true;
                } else {
                    orderToday =
                        order.order[days[currentDate.getDay() - 1]].chosen;
                }
            } else {
                user = await userModel
                    .findById(input.nfcId)
                    .select("-_id -__v");

                if (!user) return { user: null, order: null, failure: true };

                await new orderModel({
                    user: input.nfcId,
                    order: {
                        monday: {
                            chosen: process.env.FALLBACK_ORDER_TEXT as string,
                            completed: false,
                        },
                        tuesday: {
                            chosen: process.env.FALLBACK_ORDER_TEXT as string,
                            completed: false,
                        },
                        wednesday: {
                            chosen: process.env.FALLBACK_ORDER_TEXT as string,
                            completed: false,
                        },
                        thursday: {
                            chosen: process.env.FALLBACK_ORDER_TEXT as string,
                            completed: false,
                        },
                        friday: {
                            chosen: process.env.FALLBACK_ORDER_TEXT as string,
                            completed: false,
                        },
                    },
                    year: year,
                    weekNumber: week,
                }).save();

                orderToday = process.env.FALLBACK_ORDER_TEXT as string;
            }

            if (orderToday === process.env.NO_ORDER_OPTION_TEXT) {
                orderToday = process.env.NO_ORDER_TEXT as string;

                failure = true;
            }

            return {
                user: user,
                order: orderToday,
                failure,
            };
        }),

    setCompleted: procedure
        .input(
            z.object({
                nfcId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const currentDate = new Date();

            const year = getWeekYear(currentDate);
            const week = getWeek(currentDate);

            const today = days[currentDate.getDay() - 1];

            const order = await orderModel.findOne({
                user: input.nfcId,
                year: year,
                weekNumber: week,
            });

            if (order) {
                order.order[today].completed = true;
                await order.save();
            }
        }),
    getOrderCounts: procedure
        .input(z.object({ year: z.number(), week: z.number() }))
        .query(async ({ input }) => {
            return [
                await orderModel.aggregate([
                    {
                        $match: {
                            year: input.year,
                            weekNumber: input.week,
                        },
                    },
                    {
                        $group: {
                            _id: "$order.monday.chosen",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: {
                            count: -1,
                        },
                    },
                ]),
                await orderModel.aggregate([
                    {
                        $match: {
                            year: input.year,
                            weekNumber: input.week,
                        },
                    },
                    {
                        $group: {
                            _id: "$order.tuesday.chosen",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: {
                            count: -1,
                        },
                    },
                ]),
                await orderModel.aggregate([
                    {
                        $match: {
                            year: input.year,
                            weekNumber: input.week,
                        },
                    },
                    {
                        $group: {
                            _id: "$order.wednesday.chosen",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: {
                            count: -1,
                        },
                    },
                ]),
                await orderModel.aggregate([
                    {
                        $match: {
                            year: input.year,
                            weekNumber: input.week,
                        },
                    },
                    {
                        $group: {
                            _id: "$order.thursday.chosen",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: {
                            count: -1,
                        },
                    },
                ]),
                await orderModel.aggregate([
                    {
                        $match: {
                            year: input.year,
                            weekNumber: input.week,
                        },
                    },
                    {
                        $group: {
                            _id: "$order.friday.chosen",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $sort: {
                            count: -1,
                        },
                    },
                ]),
            ];
        }),
});
