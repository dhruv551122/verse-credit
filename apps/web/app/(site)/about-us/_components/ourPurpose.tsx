import RichText from "@/components/ui/rich-text";
import { AboutUspageQueryResult } from "@sanity-types/*";

const OurPurpose = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="bg-chathams-blue">
      <div className="max-width-container padding-container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-4xl text-white font-semibold">
            {data.purposeTitle}
          </h2>
          <RichText
            content={data.aboutContent}
            className="prose-strong:text-white prose-p:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default OurPurpose;
