import mongoose, {Model, ObjectId} from "mongoose";


const commentsSchema = new mongoose.Schema<CommentsDBType>({
    content: {type: String, required: true},
    createdAt: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true}
    },
    postId: {type: String, required: true},
    likes: [{
        likeStatus: {type: String, required: true},
        userId: {type: String, required: true}
    }]
})

type CommentModel = Model<CommentsDBType>;

export const CommentModel = mongoose.model<CommentsDBType, CommentModel>('Comment', commentsSchema)

export type CommentsDBType = {
    _id: ObjectId,
    content: string,
    createdAt: string,
    commentatorInfo: CommentatorInfoType,
    postId: string,
    likes: LikesAndDislikesType[]
}

export enum LikeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export type LikesAndDislikesType = {
    likeStatus: LikeStatus,
    userId: string
}

export type CommentInputType = {
    content: string,
    createdAt: string,
    commentatorInfo: {
        userId?: string,
        userLogin: string
    },
    postId: string
}

type CommentatorInfoType = {
    userId: string,
    userLogin: string
}


export type OutputCommentType = {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfoType,
    createdAt: string
    likesInfo: LikesInfoType
}

type LikesInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus
}

export type OutputPaginatedCommentsType = {
    items: OutputCommentType[],
    totalCount: number,
    pagesCount: number,
    page: string,
    pageSize: string
}
