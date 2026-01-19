import blog from "./blog";
import blogAuthor from "./blogAuthor";
import blogCategory from "./blogCategory";
import { blogCategoryPage } from "./blogCategoryPage";
import { calculator } from "./calculator";
import { calculatorCategory } from "./calculatorCategories";
import { contactUs } from "./contact-us";
import home from "./home";
import { settings } from "./settings";

export const singletons = [settings, home, blogCategoryPage, contactUs];
export const multiTypes = [
  calculator,
  calculatorCategory,
  blogCategory,
  blogAuthor,
  blog,
];
export const documents = [...singletons, ...multiTypes];
