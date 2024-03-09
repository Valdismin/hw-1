export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type UpdatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type OutputPostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export type PostDBType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}
