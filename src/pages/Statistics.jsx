import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const Statistics = () => {
  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ["statisticsCount"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics-count`
      );
      return data;
    },
  });
  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-66px)] flex justify-center items-center">
        <ImSpinner9
          size={22}
          color="[#1f1d1d]"
          className="animate-spin m-auto"
        />
      </div>
    );
  return (
    <section>
      <div className="flex justify-center items-center flex-col min-h-[calc(100vh-66px)]">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Real-Time Email Tracking!
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
              Welcome to pathaoMaiL, your all-in-one solution for email
              automation. Easily send, receive, and track emails directly from
              your dashboard.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-[#302c2c65]  hover:border-b-2 px-4 py-8 text-center hover:-translate-y-2 transform transition duration-200">
              <p className="order-last text-lg font-medium text-gray-500">
                Total SMTP
              </p>

              <p className="text-4xl font-extrabold text-bg-[#1f1d1d] md:text-5xl">
                {statistics?.smtp}
              </p>
            </div>

            <div className="flex flex-col rounded-lg border border-[#302c2c65] hover:border-b-2 px-4 py-8 text-center hover:-translate-y-2 transform transition duration-200">
              <p className="order-last text-lg font-medium text-gray-500">
                Total Customer
              </p>

              <dd className="text-4xl font-extrabold text-bg-[#1f1d1d] md:text-5xl">
                {statistics?.customers}
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-[#302c2c65] hover:border-b-2 px-4 py-8 text-center hover:-translate-y-2 transform transition duration-200">
              <p className="order-last text-lg font-medium text-gray-500">
                Total Campaign
              </p>

              <p className="text-4xl font-extrabold text-bg-[#1f1d1d] md:text-5xl">
                {statistics?.campaign}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
