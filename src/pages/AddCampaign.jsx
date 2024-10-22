import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [smtpEmail, setSmtpEmail] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  const { data: smtpEmails = [] } = useQuery({
    queryKey: ["smtp-email"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/smtp-email`
      );
      return data;
    },
  });

  const { data: customers = [] } = useQuery({
    queryKey: ["customers-email"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/customers`
      );
      return data;
    },
  });

  const handleSmtp = (e) => {
    setSmtpEmail(e.target.value);
  };
  const handleCustomerEmail = (e) => {
    setCustomerEmail(e.target.value);
  };
  const handleAddCampaign = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fromName = form.fromName.value;
    const subject = form.subject.value;
    const message = form.message.value;
    const campaignInfo = {
      fromName,
      subject,
      message,
      smtpEmail,
      customerEmail,
      status: "inactive",
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-campaign`,
        campaignInfo
      );
      if (data.insertedId) {
        toast.success("Campaign added successfully");
        navigate("/campaign");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section className="mx-8 my-6 sm:my-0">
      <div className="sm:min-h-[calc(100vh-66px)] flex justify-center items-center">
        <form
          onSubmit={handleAddCampaign}
          className="flex flex-col justify-center max-w-lg w-full  items-center gap-3"
        >
          <input
            required
            name="fromName"
            type="text"
            placeholder="From Name"
            className="input input-bordered border-gray-400 w-full max-w-xs"
          />
          <input
            required
            name="subject"
            type="text"
            placeholder="Subject"
            className="input input-bordered border-gray-400 w-full max-w-xs"
          />
          <input
            required
            name="message"
            type="text"
            placeholder="Message"
            className="input input-bordered border-gray-400 w-full max-w-xs"
          />
          <select
            required
            onChange={handleSmtp}
            className="select select-bordered border-gray-400 w-full max-w-xs"
          >
            <option value="">SMTP</option>
            {[...new Set(smtpEmails?.map((smtp) => smtp.email))].map(
              (email, index) => (
                <option key={index} value={email}>
                  {email}
                </option>
              )
            )}
          </select>
          <select
            required
            onChange={handleCustomerEmail}
            className="select select-bordered border-gray-400 w-full max-w-xs"
          >
            <option value="">Customer Mail</option>
            {[...new Set(customers?.map((customer) => customer.email))].map(
              (email, index) => (
                <option key={index} value={email}>
                  {email}
                </option>
              )
            )}
          </select>
          <button
            disabled={loading}
            type="submit"
            className="px-2 disabled:cursor-not-allowed max-w-xs h-11 flex justify-center items-center mt-1 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1f1d1d] rounded-lg hover:bg-neutral-700 focus:ring-opacity-80"
          >
            {loading ? (
              <ImSpinner9
                size={16}
                color="white"
                className="animate-spin m-auto"
              />
            ) : (
              "Add Campaign"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddCampaign;
