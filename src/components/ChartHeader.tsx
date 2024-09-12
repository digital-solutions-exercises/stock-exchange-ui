import Search from "./Search";

const ChartHeader = ({ name }: any) => {
  return (
    <>
      <div
        data-testid="chart-header-component-id"
        className="flex flex-col justify-start sm:items-center sm:flex-row sm:gap-6"
      >
        <h1 className="text-2xl lg:text-5xl">{name}</h1>
        <Search />
      </div>
    </>
  );
};

export default ChartHeader;
