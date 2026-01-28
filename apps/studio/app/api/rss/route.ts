import { sanityFetch } from "studio/sanity/lib/live"
import { blogsRssQuery } from "studio/sanity/lib/query"

export const GET = async () => {
        const  {data} = await sanityFetch({query: blogsRssQuery})
        console.log(data)
}