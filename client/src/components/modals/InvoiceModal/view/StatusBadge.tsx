import { getUserBySessionToken } from "../../../../apicalls/users";
import { updateInvoiceStatus } from "../../../../apicalls/invoice";
import { invoiceId, useInvoiceById } from "../../../../store/invoice";
import { openViewInvoiceModal } from "../../../../store/invoice";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const StatusBadge = () => {
  const { data, fetchInvoice } = useInvoiceById();

  const { openViewInvoice } = openViewInvoiceModal();
  const [sessionToken, setSessionToken] = useState({
    _id: "",
    email: "",
    username: "",
  });

  const token = localStorage.getItem("token");

  const [status, setStatus] = useState("");
  const { id } = invoiceId();

  useEffect(() => {
    const getSessionToken = async () => {
      const response = await getUserBySessionToken({ token: token });
      if (response.success) {
        setSessionToken(response.data);
      }
    };

    getSessionToken();
  }, []);

  useEffect(() => {
    if (id) {
      fetchInvoice(id);
    }
  }, [openViewInvoice, id]);

  useEffect(() => {
    if (data.status) {
      setStatus(data.status);
    }
  }, [data.status]);

  const updateStatus = async (status: string) => {
    try {
      await updateInvoiceStatus({
        _id: id,
        userid: sessionToken._id,
        status,
      });
      toast.success("Status updated successfully");
      await fetchInvoice(id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-primary">Status:</span>
        <span
          className={`text-xs ${
            status === "paid"
              ? "text-green-500 bg-green-500/10 p-1 px-2 rounded-md"
              : status === "pending"
              ? "text-yellow-500 bg-yellow-500/10 p-1 px-2 rounded-md"
              : "text-red-500 bg-red-500/10 p-1 px-2 rounded-md"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-6">
        {status === "pending" || status === "cancelled" ? (
          <>
            <button
              className="text-xs text-white bg-primary px-4 py-2 rounded"
              onClick={() => updateStatus("paid")}
            >
              Mark as Paid
            </button>
          </>
        ) : (
          <>
            <button
              className="text-xs text-red-500 bg-red-200 px-4 py-2 rounded"
              onClick={() => updateStatus("cancelled")}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default StatusBadge;
