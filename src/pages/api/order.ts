import type { NextApiRequest, NextApiResponse } from "next";

import userModel from "models/User";
import orderModel from "models/Order";
import { getWeek, getWeekYear } from "utils/isoweek";
import mongoose from "mongoose";
import connect from "clients/mongoose";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        if (mongoose.connection.readyState === 0) {
            await connect();
        }

        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        const answers = Object.values(req.body.answers);

        if (answers.length !== 5) {
            res.status(400).send("Invalid order");
            return;
        }

        const order: { [key: string]: { chosen: string; completed: boolean } } =
            {};

        answers.forEach((value, index) => {
            order[days[index]] = { chosen: value as string, completed: false };
        });

        const nextWeek = new Date();

        nextWeek.setDate(nextWeek.getDate() + 7);

        const year = getWeekYear(nextWeek);
        const week = getWeek(nextWeek);

        await new orderModel({
            user: user.id,
            order: order,
            year: year,
            weekNumber: week,
            completed: false,
        }).save();

        res.status(200).send("OK");
    } else {
        res.status(405).send("Method not allowed");
    }
}
