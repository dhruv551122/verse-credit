const getCategories = async () => {
  const data = await fetch("http://localhost:3001/api/categories");
  return data.json();
};

const Calculator = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const data = await getCategories();
  return <div>Calculator {slug}</div>;
};

export default Calculator;
