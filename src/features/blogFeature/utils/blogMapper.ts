export const blogsMapper = (blogs) => {
    return blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }))

}
