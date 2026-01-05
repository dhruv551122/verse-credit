import {
  BlogsQueryResult,
  HomePageQueryResult,
} from "@sanity-types/sanity.types";
import Group from "./group";

const CategoriesGroup = ({
  homePage,
  blogData,
}: {
  homePage: NonNullable<HomePageQueryResult>;
  blogData: NonNullable<BlogsQueryResult>;
}) => {
  return (
    <div>
      {homePage.categoryGroup.map((group) => (
        <div key={group._key}>
          <Group group={group} blogs={blogData} />
        </div>
      ))}
    </div>
  );
};

export default CategoriesGroup;
