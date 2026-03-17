"use client";

import Title from "@/components/common/title";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  BlogsQueryResult,
  CalculatorsQueryResult,
  HomePageQueryResult,
} from "@sanity-types/*";
import { useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import CardCarousel from "../../../../../components/common/cardCarousel";
import Link from "next/link";
import { SanityImage } from "@/sanity/sanityImage";
import BlogHeader from "@/components/common/blogHeader";

const CalculatorCarousel = ({
  calculators,
}: {
  calculators: NonNullable<CalculatorsQueryResult>;
}) => {
  //   const [selectedCategory, setSelectedCategory] = useState<
  //     | NonNullable<HomePageQueryResult>["categoryGroup"][number]["categories"][number]
  //     | undefined
  //   >(group.categories[0]);
  return (
    <div className="bg-casual-navy">
      <div className="max-width-container padding-container">
        <div className="flex flex-col gap-6">
          <Title title={"Financial Calculators"} className="" />
          {/* <div className="flex flex-wrap items-center gap-4">
            {group.categories.map((category) => (
              <div key={category._id}>
                <Button
                  variant="outline"
                  className={cn(
                    category.label === selectedCategory?.label &&
                      "border-deep-bright-red text-deep-bright-red",
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.label}
                </Button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div>
        {/* {selectedCategory && ( */}
        <CardCarousel>
          {calculators
            // .filter((blog) => blog.category.label === selectedCategory.label)
            // .slice(0, 7)
            .map((calculator) => (
              <div
                key={calculator._id}
                className="min-w-60 max-w-60 sm:min-w-100 sm:max-w-100"
              >
                <CarouselItem>
                  <Link
                    href={`/calculators/${calculator.slug.current}`}
                    className="duration-300 group"
                  >
                    <div className="w-full mb-6">
                      <SanityImage
                        src={calculator.icon}
                        alt={calculator.icon.alt}
                        width={50}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-[18px] sm:text-xl font-semibold text-tuatara duration-300 leading-[115%]">
                        {calculator.calculatorName}
                      </h2>
                      <p className="text-gray-500 text-base font-medium leading-[115%]">
                        {calculator.description}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              </div>
            ))}
        </CardCarousel>
        {/* )} */}
      </div>
    </div>
  );
};

export default CalculatorCarousel;
