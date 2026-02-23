import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import {
  BlogCategoriesQueryResult,
  SettingsQueryResult,
} from "@sanity-types/*";

const SiteLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`,
  );
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogCategories`,
  );
  const settingsData: NonNullable<SettingsQueryResult> = await data.json();
  const categoriesData: NonNullable<BlogCategoriesQueryResult> =
    await categoriesRes.json();

  return (
    <div>
      <Header data={settingsData} categoriesData={categoriesData} />
      {children}
      <Footer data={settingsData} />
    </div>
  );
};

export default SiteLayout;
