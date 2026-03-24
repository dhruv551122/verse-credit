"use client";

import Title from "@/components/common/title";

import { CalculatorsQueryResult } from "@sanity-types/*";
import { CarouselItem } from "@/components/ui/carousel";
import CardCarousel from "../../../../../components/common/cardCarousel";
import Link from "next/link";
import { SanityImage } from "@/sanity/sanityImage";

const CalculatorCarousel = ({
  calculators,
}: {
  calculators: NonNullable<CalculatorsQueryResult>;
}) => {
  return (
    <div className="bg-casual-navy">
      <div className="max-width-container padding-container">
        <div className="flex flex-col gap-6">
          <Title title={"Financial Calculators"} className="text-white" />
        </div>
      </div>
      <div>
        <CardCarousel>
          {calculators.map((calculator) => (
            <CarouselItem key={calculator._id} className="basis-2/3 sm:basis-2/5 md:basis-2/7 lg:basis-1/5">
              <Link
                href={`/calculators/${calculator.slug.current}`}
                className="duration-300 group"
              >
                <div className="w-full mb-4 sm:mb-6">
                  <SanityImage
                    src={calculator.icon}
                    alt={calculator.icon.alt}
                    width={50}
                    height={100}
                    className="object-contain w-auto sm:h-12 h-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-[18px] sm:text-xl font-semibold group-hover:text-deep-bright-red text-white duration-300 leading-[115%]">
                    {calculator.calculatorName}
                  </h2>
                  <p className="text-white text-sm sm:text-base font-medium leading-[115%]">
                    {calculator.description}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CardCarousel>
      </div>
    </div>
  );
};

export default CalculatorCarousel;
