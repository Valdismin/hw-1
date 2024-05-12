import mongoose, {Model, ObjectId} from "mongoose";


const commentsSchema = new mongoose.Schema<CommentsDBType>({
    content: {type: String, required: true},
    createdAt: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true}
    },
    postId: {type: mongoose.Schema.ObjectId, required: true}
})

type CommentModel = Model<CommentsDBType>;

export const CommentModel = mongoose.model<CommentsDBType, CommentModel>('Comment', commentsSchema)

export type CommentsDBType = {
    _id: ObjectId,
    content: string,
    createdAt: string,
    commentatorInfo: CommentatorInfoType,
    postId: ObjectId
}

export type CommentInputType = {
    content: string,
    createdAt: string,
    commentatorInfo: {
        userId: string,
        userLogin: string
    },
    postId: ObjectId
}

type CommentatorInfoType = {
    userId: string,
    userLogin: string
}


export type OutputCommentType = {
    _id: ObjectId,
    content: string,
    commentatorInfo: CommentatorInfoType,
    createdAt: string
}
export type OutputPaginatedCommentsType = {
    items: OutputCommentType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}
