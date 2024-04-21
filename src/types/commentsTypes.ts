export type CommentsDBType = {
    id:string,
    content:string,
    createdAt:string,
    commentatorInfo: CommentatorInfoType,
    postId:string
}

type CommentatorInfoType = {
    userId:string,
    userLogin:string
}


export type OutputCommentType = {
    id: string,
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
