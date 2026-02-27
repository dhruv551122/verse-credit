import RichText from "@/components/ui/rich-text";
import { AboutUspageQueryResult } from "@sanity-types/*";

const Clarification = ({
  data,
}: {
  data: NonNullable<AboutUspageQueryResult>;
}) => {
  return (
    <div className="bg-strong-amber">
      <div className="max-width-container padding-container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-white md:text-4xl">
            {data.clarificationTitle}
          </h2>
          <RichText
            content={data.clarificationContent}
            className="prose-p:mb-0 prose-p:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Clarification;
