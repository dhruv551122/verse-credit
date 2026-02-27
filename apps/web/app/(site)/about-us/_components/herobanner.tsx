import { SanityImage } from "@/sanity/sanityImage";
import { AboutUspageQueryResult } from "@sanity-types/*";

const Herobanner = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="relative ">
      <SanityImage
        src={data.herobannerImage}
        alt={data.herobannerImage.alt}
        fill
        className="object-cover -z-1"
      />
      <div className="max-width-container padding-container min-h-100 items-end flex">
        <h1 className="text-white text-4xl md:text-5xl font-semibold">
          {data.herobannerTitle}
        </h1>
      </div>
    </div>
  );
};

export default Herobanner;
