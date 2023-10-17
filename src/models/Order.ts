import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IOrder {
    user: string;
    order: {
        monday: {
            chosen: string;
            completed: boolean;
        };
        tuesday: {
            chosen: string;
            completed: boolean;
        };
        wednesday: {
            chosen: string;
            completed: boolean;
        };
        thursday: {
            chosen: string;
            completed: boolean;
        };
        friday: {
            chosen: string;
            completed: boolean;
        };
    };
    year: number;
    weekNumber: number;
}

const OrderSchema = new Schema<IOrder>({
    user: {
        type: String,
        ref: "User",
        index: true,
    },
    order: {
        monday: {
            chosen: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        tuesday: {
            chosen: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        wednesday: {
            chosen: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        thursday: {
            chosen: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        friday: {
            chosen: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    },
    year: {
        type: Number,
        required: true,
    },
    weekNumber: {
        type: Number,
        required: true,
        index: true,
    },
});

const Order: Model<IOrder> =
    mongoose.models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
