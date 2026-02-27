import RichText from "@/components/ui/rich-text";
import { SanityImage } from "@/sanity/sanityImage";
import { AboutUspageQueryResult } from "@sanity-types/*";

const WhatWeOffer = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="max-width-container padding-container">
      <h2 className="text-2xl md:text-4xl text-tuatara font-semibold">
        {data.whatWeOfferTitle}
      </h2>
      <div className="w-full">
        {data.whatWeOfferItems.map((item) => (
          <div key={item._key} className="relative w-full">
            <SanityImage
              src={item.image}
              alt={item.image.alt}
              fill
              className="min-h-full! w-auto! object-contain right-10"
            />
            <h3 className="text-xl md:text-3xl text-tuatara font-semibold">
              {item.title}
            </h3>
            <RichText content={item.content} className="prose-p:text-tuatara" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
