import { sanityFetch } from "@/sanity/lib/live"
import { aboutUspageQuery } from "@/sanity/lib/query"
import { AboutUspageQueryResult } from "@sanity-types/*"
import Herobanner from "./_components/herobanner"
import About from "./_components/about"
import OurPurpose from "./_components/ourPurpose"
import WhatWeOffer from "./_components/whatWeOffer"

const AboutUsPage = async () => {
    const {data} = await sanityFetch<NonNullable<AboutUspageQueryResult>>({query: aboutUspageQuery})
    return <div className="pt-16.5">
        <Herobanner data={data}/>
        <About data={data} />
        <OurPurpose data={data}/>
        <WhatWeOffer data={data}/>
    </div>
}

export default AboutUsPage