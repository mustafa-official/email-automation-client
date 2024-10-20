import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Campaign = () => {
  const [loadingMap, setLoadingMap] = useState({});
  const {
    data: allCampaign = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCampaign"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/all-campaign");
      return data;
    },
  });

  const handleToggle = async (id) => {
    try {
      setLoadingMap((prev) => ({ ...prev, [id]: true }));
      const response = await axios.post(
        `http://localhost:5000/send-email/${id}`
      );
      if (response.data.success) {
        toast.success("Email sent successfully!");
        setLoadingMap((prev) => ({ ...prev, [id]: false }));
        refetch();
      } else {
        toast.error(response.data.message);
        setLoadingMap((prev) => ({ ...prev, [id]: false }));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email.");
      setLoadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  return (
    <section className="mt-12">
      <Link to="/add-campaign">
        <button className="px-4 mx-8 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Add Campaign
        </button>
      </Link>

      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#4d7fecea]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>From Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>SMTP</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Subject</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Customer Email</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allCampaign?.map((campaign) => (
                    <tr key={campaign._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {campaign.fromName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {campaign.smtpEmail}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {campaign.subject}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {campaign.customerEmail}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        <input
                          disabled={campaign.status === "active"}
                          type="checkbox"
                          className={`${
                            campaign.status === "active" && "cursor-not-allowed"
                          } toggle mt-1`}
                          checked={campaign.status === "active"}
                          onChange={() => handleToggle(campaign._id, campaign)}
                        />
                        {loadingMap[campaign._id] && (
                          <span className="ml-2 loading loading-dots loading-xs"></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Campaign;
