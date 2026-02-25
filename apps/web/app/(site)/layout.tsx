import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { blogCategoriesQuery, settingsQuery } from "@/sanity/lib/query";
import {
  BlogCategoriesQueryResult,
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

  return (
    <div className="font-inter">
      <Header data={settingsData} categoriesData={categoriesData} />
      {children}
      <Footer data={settingsData} />
      <SanityLive />
    </div>
  );
};

export default SiteLayout;
