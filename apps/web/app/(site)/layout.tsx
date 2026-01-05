import Header from "@/components/common/header";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/query";
import { SettingsQueryResult } from "@sanity-types/sanity.types";

const SiteLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: settingsData }: { data: NonNullable<SettingsQueryResult> } =
    await sanityFetch({ query: settingsQuery });
  return (
    <div>
      <Header data={settingsData} />
      {children}
    </div>
  );
};

export default SiteLayout;
