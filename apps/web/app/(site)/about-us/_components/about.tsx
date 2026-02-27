import RichText from "@/components/ui/rich-text";
import { AboutUspageQueryResult } from "@sanity-types/*";

const About = ({ data }: { data: NonNullable<AboutUspageQueryResult> }) => {
  return (
    <div className="max-width-container padding-container">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl text-tuatara font-semibold">
          {data.aboutTitle}
        </h2>
        <RichText
          content={data.aboutContent}
          className="prose-p:text-tuatara prose-strong:text-tuatara"
        />
      </div>
    </div>
  );
};

export default About;
