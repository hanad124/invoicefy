import { Dialog, DialogContent } from "../../ui/dialog";
import { openEditInvoiceModal } from "../../../store/invoice";
import { updateInvoice } from "../../../apicalls/invoice";
import { getUserBySessionToken } from "../../../apicalls/users";
import { useEffect, useState } from "react";
import { useInvoices, invoiceId, useInvoiceById } from "../../../store/invoice";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FiLoader, FiCheckCircle } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../Input";
import ItemListItem from "./ItemListItem";
import Button from "../../Button";
import ItemList from "./ItemList";

const EditInvoiceModel = () => {
  const { setOpenEditInvoice, openEditInvoice } = openEditInvoiceModal();
  const [total, setTotal] = useState(0);
  const [sessionToken, setSessionToken] = useState({
    _id: "",
    email: "",
    username: "",
  });
  const { fetchData } = useInvoices();
  const { id } = invoiceId();
  const { data, fetchInvoice } = useInvoiceById();

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isLoading },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      invoiceDate: new Date(),
      status: "pending",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const calculateTotal = () => {
    let total = 0;
    fields.forEach((index) => {
      const quantity = watch(`items[${index}].quantity`);
      const price = watch(`items[${index}].price`);

      total += quantity * price;
    });
    setTotal(total);
  };

  useEffect(() => {
    calculateTotal();
    return () => {
      calculateTotal();
    };
  }, [watch("items"), fields]);

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
  }, [openEditInvoice, id]);

  useEffect(() => {
    if (data) {
      const invoice = data;

      if (openEditInvoice) {
        setValue("clientName", invoice?.clientName);
        setValue("description", invoice?.description);

        const accumulatedItems = invoice?.items.map((item: any) => ({
          _id: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        }));

        setValue("items", accumulatedItems);
      }
    }
  }, [data]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.items.length === 0) {
      toast.error("You need to add at least 1 item!");
    } else {
      updateInvoice({
        ...data,
        status: "pending",
        total,
        user: sessionToken._id,
        _id: id,
      })
        .then(() => {
          toast.success("Invoice updated successfully!");
          setOpenEditInvoice(false);
          reset();
          fetchData();
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred!");
        });
    }
  };

  return (
    <>
      <Dialog
        open={openEditInvoice}
        onOpenChange={(openEditInvoice) => {
          setOpenEditInvoice(openEditInvoice);

          if (!openEditInvoice) {
            reset();
          }
        }}
      >
        <DialogContent className="sm:max-w-fit md:min-w-[40rem]">
          <h1 className="font-semibold text-lg">Create New Invoice </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Client Name"
                  id="clientName"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Description"
                  id="description"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12">
                <ItemList>
                  <div className="flex flex-col gap-4">
                    {fields.map((_, index) => (
                      <ItemListItem
                        key={index}
                        id={`items[${index}]`}
                        register={register}
                        errors={errors}
                        required
                        watch={watch}
                        remove={remove}
                        setCustomValue={setCustomValue}
                        index={index}
                        calculateTotal={calculateTotal}
                      />
                    ))}
                    <Button
                      label="+ Add New Item"
                      stretch
                      grey
                      onClick={() => {
                        append({});
                      }}
                    />
                  </div>
                </ItemList>
              </div>
              <div className="col-span-12 flex justify-end w-full ">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center justify-center gap-2 p-2 bg-primary text-white rounded-full w-full px-4 ${
                    isLoading && "cursor-not-allowed bg-primary/60"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Saving Invoice</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      <span>Save Invoice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default EditInvoiceModel;
