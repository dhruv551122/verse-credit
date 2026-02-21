const getCategories = async () => {
  const data = await fetch("http://localhost:3001/api/categories");
  return data.json();
};

const Calculator = async ({
  params,
}: {
  params: { calculatorCategorySlug: string };
}) => {
  const { calculatorCategorySlug } = await params;

  const data = await getCategories();
  return <div>Calculator {calculatorCategorySlug}</div>;
};

export default Calculator;
