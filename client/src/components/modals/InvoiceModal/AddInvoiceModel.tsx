import { Dialog, DialogContent } from "../../ui/dialog";
import { openNewInvoiceModal } from "../../../store/model";
import { createInvoice } from "../../../apicalls/invoice";
import { getUserBySessionToken } from "../../../apicalls/users";
import { useEffect, useState } from "react";
import { useInvoices } from "../../../store/invoice";
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

const AddInvoiceModel = () => {
  const { setOpen, open } = openNewInvoiceModal();
  const [total, setTotal] = useState(0);
  const [sessionToken, setSessionToken] = useState({
    _id: "",
    username: "",
    email: "",
    role: "",
  });
  const { fetchData } = useInvoices();

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

  const items = watch("items");

  useEffect(() => {
    let newTotal = 0;

    if (items) {
      items.forEach((item: any) => {
        const quantity = item.quantity;
        const price = item.price;

        if (quantity && price) {
          newTotal += quantity * price;
        }
      });
    }

    setTotal(newTotal);
  }, [items, fields]);

  useEffect(() => {
    const getSessionToken = async () => {
      const response = await getUserBySessionToken({ token: token });
      if (response.success) {
        setSessionToken(response.data);
      }
    };

    getSessionToken();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.items.length === 0) {
      toast.error("You need to add at least 1 item!");
    } else {
      createInvoice({
        ...data,
        total: total,
        user: sessionToken._id,
      })
        .then(() => {
          toast.success("Invoice created successfully!");
          setOpen(false);
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
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
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

export default AddInvoiceModel;
