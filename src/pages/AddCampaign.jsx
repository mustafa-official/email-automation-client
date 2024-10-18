import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [smtpEmail, setSmtpEmail] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  const { data: smtpEmails = [] } = useQuery({
    queryKey: ["smtp-email"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/smtp-email");
      return data;
    },
  });

  const { data: customers = [] } = useQuery({
    queryKey: ["customers-email"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/customers");
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
        "http://localhost:5000/create-campaign",
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
    <section className="mx-8 mt-12">
      <form
        onSubmit={handleAddCampaign}
        className="flex flex-col justify-center items-center gap-3"
      >
        <input
          required
          name="fromName"
          type="text"
          placeholder="From Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          required
          name="subject"
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          required
          name="message"
          type="text"
          placeholder="Message"
          className="input input-bordered w-full max-w-xs"
        />
        <select
          required
          onChange={handleSmtp}
          className="select select-bordered w-full max-w-xs"
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
          className="select select-bordered w-full max-w-xs"
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
          className="px-2 disabled:cursor-not-allowed max-w-xs h-12 flex justify-center items-center mt-1 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-neutral-900 focus:ring-opacity-80"
        >
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Add Campaign"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddCampaign;
