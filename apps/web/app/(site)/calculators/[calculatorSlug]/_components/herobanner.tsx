import { SanityImage } from "@/sanity/sanityImage";
import { CalculatorBySlugQueryResult } from "@sanity-types/*";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Herobanner = ({
  data,
}: {
  data: NonNullable<CalculatorBySlugQueryResult>;
}) => {
  return (
    <div className="bg-linear-to-t from-casual-navy -from-45% to-80% to-bright-royal-blue">
      <div className="max-width-container padding-container pb-40! text-white">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-2 text-teal-grey">
            <Link href="/" className="duration-300 hover:text-gray-500">
              Home
            </Link>
            <ChevronRight size={24} className="min-w-6" />
            <Link href="/calculators" className="truncate hover:text-gray-500">
              Calculators
            </Link>
            <ChevronRight size={24} className="min-w-6" />
            <p className="truncate text-teal-grey/60">{data.title}</p>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex items-start gap-4">
              <SanityImage
                src={data.icon}
                alt={data.icon.alt}
                width={48}
                height={48}
                className="object-contain w-8 h-8 shrink-0 md:w-12 md:h-12"
              />
              <h2 className="text-3xl font-semibold md:text-5xl leading-[100%]">
                {data.title}
              </h2>
            </div>
            <p className="text-[18px] text-teal-grey font-normal">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
