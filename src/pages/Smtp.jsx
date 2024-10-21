import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Smtp = () => {
  const [loading, setLoading] = useState(false);
  const [encryption, setEncryption] = useState("");
  const [selectedEmail, setSelectedEmail] = useState({});

  const {
    data: smtpEmail = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["smtp-email"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/smtp-email`
      );
      return data;
    },
  });

  const handleEncryption = (e) => {
    setEncryption(e.target.value);
  };
  const handleSmtp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const hostname = form.hostname.value;
    const port = form.port.value;

    const smtpInfo = {
      email,
      password,
      encryption,
      hostname,
      port,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-smtp`,
        smtpInfo
      );

      if (data.insertedId) {
        toast.success("SMTP created successfully");
        refetch();
        form.reset();
        setEncryption("");
        setLoading(false);
        document.getElementById("modal-two").close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create SMTP");
      setLoading(false);
    }
  };

  const openUpdateModal = async (id) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/smtp-email/${id}`
    );
    setSelectedEmail(data);
    setEncryption(data.encryption || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const hostname = form.hostname.value;
    const port = form.port.value;

    const smtpUpdateInfo = {
      email,
      password,
      encryption,
      hostname,
      port,
    };
    // console.log(smtpUpdateInfo);
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/smtp-update/${selectedEmail?._id}`,
        smtpUpdateInfo
      );
      if (data.modifiedCount === 1) {
        toast.success("Updated Successfully");
        setLoading(false);
        document.getElementById("modal").close();
        refetch();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/smtp-delete/${id}`
          );
          if (data.deletedCount === 1) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <ImSpinner9
          size={22}
          color="[#1f1d1d]"
          className="animate-spin m-auto"
        />
      </div>
    );
  return (
    <section className="mt-12 min-h-[calc(100vh-114px)]">
      <div className="flex items-center justify-between mx-8">
        <h2 className="text-lg flex gap-2 flex-wrap items-center font-medium text-gray-800 ">
          Total
          <span className="px-3 py-1 text-xs text-white  bg-[#1f1d1d] rounded-full ">
            {smtpEmail?.length} SMTP
          </span>
        </h2>
        <div>
          <button
            onClick={() => document.getElementById("modal-two").showModal()}
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1f1d1d] rounded-lg hover:bg-[#1f1d1d]"
          >
            Create SMTP
          </button>
        </div>
      </div>
      <dialog id="modal-two" className="modal">
        <div className="modal-box max-w-sm">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Email Credentials</h3>
          <div className="mt-4">
            <form onSubmit={handleSmtp} className="flex flex-col gap-3">
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <select
                required
                onChange={handleEncryption}
                defaultValue=""
                className="select select-bordered w-full"
              >
                <option value="">Select Encryption</option>
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
              </select>
              <input
                required
                type="text"
                name="hostname"
                placeholder="Host Name"
                className="input input-bordered w-full"
              />
              <input
                required
                type="number"
                name="port"
                placeholder="Port"
                className="input input-bordered w-full"
              />

              <button
                disabled={loading}
                type="submit"
                className="px-2  disabled:cursor-not-allowed h-11 flex justify-center items-center mt-6 w-full  tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1f1d1d] rounded-lg hover:bg-neutral-900"
              >
                {loading ? (
                  <ImSpinner9
                    size={16}
                    color="white"
                    className="animate-spin m-auto"
                  />
                ) : (
                  "Add SMTP"
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
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-[#1f1d1d]  text-[15px]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4  text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Host Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4  text-left rtl:text-right text-white"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-left rtl:text-right text-white"
                    >
                      <span>Password</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-left rtl:text-right text-white"
                    >
                      <span>Port</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-left rtl:text-right text-white"
                    >
                      <span>Encryption</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5  text-left rtl:text-right text-white"
                    >
                      <span>Modify</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5  text-left rtl:text-right text-white"
                    >
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-500 ">
                  {smtpEmail?.map((data) => (
                    <tr key={data?._id} className="text-[15px]">
                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        {data.hostname}
                      </td>
                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        {data.password}
                      </td>
                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        {data.port}
                      </td>
                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        {data.encryption}
                      </td>

                      <td className="px-4 py-4  text-gray-900  whitespace-nowrap">
                        <button
                          onClick={() => {
                            document.getElementById("modal").showModal();
                            openUpdateModal(data._id);
                          }}
                          className="px-4 py-2 flex items-center gap-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 hover:bg-green-600 rounded-lg"
                        >
                          Update <MdOutlineModeEdit size={13} />
                        </button>
                        <dialog id="modal" className="modal">
                          <div className="modal-box max-w-sm">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-lg">
                              Update Email Credentials
                            </h3>
                            <div className="mt-4">
                              <form
                                onSubmit={handleUpdate}
                                className="flex flex-col gap-3"
                              >
                                <input
                                  defaultValue={selectedEmail?.email}
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  className="input input-bordered w-full"
                                />
                                <input
                                  defaultValue={selectedEmail?.password}
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  className="input input-bordered w-full"
                                />
                                <select
                                  onChange={handleEncryption}
                                  value={encryption || ""}
                                  className="select select-bordered w-full"
                                >
                                  <option value="">Select Encryption</option>
                                  <option value="TLS">TLS</option>
                                  <option value="SSL">SSL</option>
                                </select>
                                <input
                                  defaultValue={selectedEmail?.hostname}
                                  type="text"
                                  name="hostname"
                                  placeholder="Host Name"
                                  className="input input-bordered w-full"
                                />
                                <input
                                  defaultValue={selectedEmail?.port}
                                  type="number"
                                  name="port"
                                  placeholder="Port"
                                  className="input input-bordered w-full"
                                />

                                <button
                                  disabled={loading}
                                  type="submit"
                                  className="px-2 disabled:cursor-not-allowed h-11 flex justify-center items-center mt-6 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1f1d1d] rounded-lg hover:bg-neutral-900 focus:ring-opacity-80"
                                >
                                  {loading ? (
                                    <ImSpinner9
                                      size={16}
                                      color="white"
                                      className="animate-spin m-auto"
                                    />
                                  ) : (
                                    "Update Mail"
                                  )}
                                </button>
                              </form>
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800  whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="px-4 flex items-center gap-1 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                        >
                          Delete <RiDeleteBin6Line />
                        </button>
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

export default Smtp;
