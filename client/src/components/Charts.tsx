import ApexChart from "./ApexChart";
import Carousel from "./Carousel";

const Charts = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <ApexChart />
        <Carousel />
      </div>
    </div>
  );
};

export default Charts;
