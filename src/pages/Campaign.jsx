import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-campaign`
      );
      return data;
    },
  });

  const handleToggle = async (id) => {
    try {
      setLoadingMap((prev) => ({ ...prev, [id]: true }));
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send-email/${id}`
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
      <div className="min-h-[calc(100vh-66px)] flex justify-center items-center">
        <ImSpinner9
          size={22}
          color="[#1f1d1d]"
          className="animate-spin m-auto"
        />
      </div>
    );
  return (
    <section className="mt-12 min-h-[calc(100vh-114px)]">
      <div className="flex items-center justify-between mx-8 flex-wrap gap-2">
        <h2 className="text-lg flex gap-2 flex-wrap items-center font-medium text-gray-800 ">
          Total
          <span className="px-3 py-1 text-xs text-white  bg-[#1f1d1d] rounded-full ">
            {allCampaign?.length} Campaigns
          </span>
        </h2>
        <div>
          <Link to="/add-campaign">
            <button className="px-4  py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1f1d1d] rounded-lg hover:bg-[#1f1d1d]">
              Add Campaign
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#1f1d1d] text-[15px]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>From Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>SMTP</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left rtl:text-right text-white"
                    >
                      <span>Subject</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left rtl:text-right text-white"
                    >
                      <span>Message</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left rtl:text-right text-white"
                    >
                      <span>Customer Email</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left rtl:text-right text-white"
                    >
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allCampaign?.map((campaign) => (
                    <tr key={campaign._id} className="text-[15px]">
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
                        {campaign.fromName}
                      </td>
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
                        {campaign.smtpEmail}
                      </td>
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
                        {campaign.subject}
                      </td>
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
                        {campaign.message}
                      </td>
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
                        {campaign.customerEmail}
                      </td>
                      <td className="px-4 py-4 text-gray-900  whitespace-nowrap">
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
