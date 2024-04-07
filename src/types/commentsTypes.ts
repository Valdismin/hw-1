export type CommentsDBType = {
    id:string,
    content:string,
    createdAt:string,
    commentatorInfo: CommentatorInfoType
}

type CommentatorInfoType = {
    userId:string,
    userLogin:string
}
