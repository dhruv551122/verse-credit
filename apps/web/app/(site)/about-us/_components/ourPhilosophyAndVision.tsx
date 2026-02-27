import RichText from "@/components/ui/rich-text";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/sanityImage";
import { AboutUspageQueryResult } from "@sanity-types/*";

const OurPhilosophyAndVision = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="max-width-container">
      <div className="padding-container flex flex-col gap-8 lg:px-0! lg:py-0!">
        {data.ourPhilosophyAndVisionItems.map((item, index) => (
          <div
            key={item._key}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0 "
          >
            <SanityImage
              src={item.image}
              alt={item.image.alt}
              width={100}
              height={100}
              className={cn(
                "object-cover w-full h-full",
                index % 2 === 0 ? "lg:order-1" : "lg:order-2",
              )}
            />
            <div
              className={cn(
                "flex flex-col gap-4 lg:px-6 lg:py-25",
                index % 2 === 0 ? "lg:order-2" : "lg:order-1",
              )}
            >
              <h2 className="text-2xl font-semibold md:text-4xl text-tuatara">
                {item.title}
              </h2>
              <RichText
                content={item.content}
                className="prose-p:mb-0 prose-ul:my-0 prose-li:my-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPhilosophyAndVision;
