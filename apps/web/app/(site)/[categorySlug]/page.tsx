import { URLSearchParams } from "url"

const CategoriesPage = async ({params}: {params: {categorySlug: string}}) => {
    const param = await params
    const searchParams = new URLSearchParams(param).toString()
    const blogsData = await fetch(`${process.env.BACKEND_URL}/api/blogs?${searchParams}`)
    const blogs = await blogsData.json()
    return <div>
        sfs
    </div>
}

export default CategoriesPage