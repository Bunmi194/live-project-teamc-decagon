import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema(
  {
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "routes",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: "boolean",
      required: true,
      default: false,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    price: {
      type: "number",
      required: true,
    },
    completed: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
