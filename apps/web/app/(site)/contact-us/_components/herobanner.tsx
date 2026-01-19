import { ContactPageQueryResult } from "@sanity-types/*";

const HeroBanner = ({
  contactPage,
}: {
  contactPage: NonNullable<ContactPageQueryResult>;
}) => {
  return (
    <div className="bg-bright-royal-blue">
      <div className="max-width-container padding-container pb-40! text-white">
        <h2 className="text-3xl font-semibold">{contactPage.contactTitle}</h2>
        <p className="text-[18px] font-normal">
          {contactPage.contactDescription}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
