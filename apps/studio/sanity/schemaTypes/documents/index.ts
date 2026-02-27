import aboutUs from "./about";
import blog from "./blog";
import blogAuthor from "./blogAuthor";
import blogCategory from "./blogCategory";
import { blogCategoryPage } from "./blogCategoryPage";
import { calculator } from "./calculator";
import { calculatorPage } from "./calculatorPage";
import { contactUs } from "./contact-us";
import home from "./home";
import { settings } from "./settings";

export const singletons = [
  settings,
  home,
  blogCategoryPage,
  contactUs,
  calculatorPage,
  aboutUs
];
export const multiTypes = [calculator, blogCategory, blogAuthor, blog];
export const documents = [...singletons, ...multiTypes];
