import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { SettingsQueryResult } from "@sanity-types/*";


const SiteLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const data = await fetch(`${process.env.BACKEND_URL}/api/settings`)
  const settingsData: NonNullable<SettingsQueryResult> = await data.json()

  return (
    <div>
      <Header data={settingsData} />
      {children}
      <Footer data={settingsData}/>
    </div>
  );
};

export default SiteLayout;
