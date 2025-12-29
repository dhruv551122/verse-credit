import { calculator } from "./calculator";
import { calculatorCategory } from "./calculatorCategories";
import { settings } from "./settings";

export const singletons = [settings];
export const multiTypes = [calculator, calculatorCategory];
export const documents = [...singletons, ...multiTypes];
