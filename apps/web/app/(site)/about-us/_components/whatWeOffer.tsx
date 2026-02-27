import RichText from "@/components/ui/rich-text";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { AboutUspageQueryResult } from "@sanity-types/*";

const WhatWeOffer = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="max-width-container padding-container">
      <h2 className="mb-6 text-2xl font-semibold md:text-4xl text-tuatara">
        {data.whatWeOfferTitle}
      </h2>
      <div className="flex flex-col w-full gap-8">
        {data.whatWeOfferItems.map((item, index) => (
          <div key={item._key} className="relative w-full min-h-80">
            <SanityImage
              src={item.image}
              alt={item.image.alt}
              width={100}
              height={100}
              className={cn(
                "h-full absolute top-0 w-auto! object-cover   opacity-30",
                index % 2 === 0 ? "right-0" : "left-0",
              )}
            />
            <div
              className={cn(
                "flex flex-col gap-4",
                index % 2 === 0 ? "text-left" : "text-right",
              )}
            >
              <h3 className="text-xl font-semibold md:text-3xl text-chathams-blue">
                {item.title}
              </h3>
              <RichText
                content={item.content}
                className="prose-p:text-tuatara"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
