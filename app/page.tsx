import { client } from "@/sanity/lib/client";
import { calculatorQuery, categoriesQuery } from "@/sanity/lib/query";

export default async function Home() {
  const data = await client.fetch(categoriesQuery);
  const calculator = await client.fetch(calculatorQuery);
  console.log(calculator);
  console.log(data);

  return (
    <div>
      <h1>Go to /studio route</h1>
    </div>
  );
}
