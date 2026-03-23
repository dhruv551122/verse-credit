import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import {
  blogCategoriesQuery,
  blogsQuery,
  calculatorsQuery,
  settingsQuery,
} from "@/sanity/lib/query";
import {
  BlogCategoriesQueryResult,
  BlogsQueryResult,
  CalculatorsQueryResult,
  SettingsQueryResult,
} from "@sanity-types/*";

const SiteLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: settingsData } = await sanityFetch<
    NonNullable<SettingsQueryResult>
  >({ query: settingsQuery });

  const { data: categoriesData } = await sanityFetch<
    NonNullable<BlogCategoriesQueryResult>
  >({
    query: blogCategoriesQuery,
  });

  const { data: blogs } = await sanityFetch<NonNullable<BlogsQueryResult>>({
    query: blogsQuery,
  });

  const { data: calculators } = await sanityFetch<
    NonNullable<CalculatorsQueryResult>
  >({ query: calculatorsQuery });

  return (
    <div className="font-poppins">
      <Header
        calculatorsData={calculators}
        data={settingsData}
        categoriesData={categoriesData}
        blogs={blogs}
      />
      {children}
      <Footer data={settingsData} />
      <SanityLive />
    </div>
  );
};

export default SiteLayout;
