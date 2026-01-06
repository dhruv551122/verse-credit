const BlogPage = async ({params}: {params: {categorySlug: string; blogSlug: string}}) => {
    const {blogSlug, categorySlug} = await params
    // console.log(blogSlug, categorySlug)
    return <div>
        
    </div>
}

export default BlogPage