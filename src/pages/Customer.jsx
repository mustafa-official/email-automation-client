import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Customer = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: customers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCustomer"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/customers");
      return data;
    },
  });

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/create-customer",
        {
          name,
          email,
        }
      );
      if (data.insertedId) {
        toast.success("Create Successfully");
        refetch();
        setLoading(false);
        document.getElementById("modal").close();
        form.reset();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <button
        onClick={() => document.getElementById("modal").showModal()}
        className="px-4 mx-8 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Create Customer
      </button>
      <dialog id="modal" className="modal">
        <div className="modal-box max-w-sm">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Customer Info</h3>
          <div className="mt-4">
            <form
              onSubmit={handleCreateCustomer}
              className="flex flex-col gap-3"
            >
              <input
                required
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <button
                disabled={loading}
                type="submit"
                className="px-2 disabled:cursor-not-allowed h-12 flex justify-center items-center mt-6 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-neutral-900 focus:ring-opacity-80"
              >
                {loading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
                        <span>Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Response</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-white"
                    >
                      <span>Message</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {customers?.map((customer) => (
                    <tr key={customer._id}>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {customer.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        {customer.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        Yes
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        No
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

export default Customer;
