const Title = ({ title }: { title: string }) => {
  return (
    <h2 className="pb-4 text-3xl font-semibold border-b border-gray-300 text-tuatara">
      {title}
    </h2>
  );
};

export default Title;
