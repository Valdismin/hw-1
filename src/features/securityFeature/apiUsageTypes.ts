import mongoose from "mongoose";

export type apiUsageDBType = {
    IP: string,
    URL: string,
    date: Date
}

const apiUsageSchema = new mongoose.Schema<apiUsageDBType>({
    IP: String,
    URL: String,
    date: Date
})

type ApiUsageModel = mongoose.Model<apiUsageDBType>

export const ApiUsageModel = mongoose.model<apiUsageDBType, ApiUsageModel>('apiUsage', apiUsageSchema);
