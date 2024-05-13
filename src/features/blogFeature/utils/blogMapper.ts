export const blogsMapper = (blogs:any) => {
    return blogs.map((blog:any) => ({
        id: blog._id,
        title: blog.title,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }))

}
