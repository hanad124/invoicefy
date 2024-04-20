import { LuImagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import noImage from "../../assets/no-image.jpeg";
import Input from "../Input";
import { useSessionToken, useInvoices, useUserInfo } from "../../store/invoice";
import { updateUserCompanyInfo } from "../../apicalls/users";
import { toast, Toaster } from "react-hot-toast";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SettingsComp = () => {
  const [loading, setLoading] = useState(false);
  const { sessionToken } = useSessionToken();
  const { fetchData } = useInvoices();
  const { fetchUserInfo, user } = useUserInfo();

  const [file, setFile] = useState<
    File | Blob | FileList | null | undefined | any
  >();
  const [image, setImage] = useState<string>("");

  console.log("sessionToken", sessionToken);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isLoading },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const uploadFile = () => {
    const name = new Date().getTime() + file?.name!;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            setLoading(true);
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // file && uploadFile();

    updateUserCompanyInfo({
      _id: sessionToken?._id,
      userid: sessionToken?._id,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyPhone: data.companyPhone,
      companyLogo: image || sessionToken?.companyLogo || noImage,
    })
      .then((res) => {
        if (res) {
          fetchData();
          toast.success("Settings updated successfully");
          fetchUserInfo();
          reset();
        } else {
          toast.error("An error occurred. Please try again later");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4">Settings</h1>
      <div className="w-full md:w-[85%] border rounded p-5">
        {/* company logo */}
        <p className="mb-3 text-[#7E88C3]">Upload company logo</p>
        <div className="border border-dashed border-slate-300 w-fit p-4 overflow-hidden rounded cursor-pointer flex flex-col items-center relative">
          <div className="absolute w-full h-full top-0 left-0 p-1 rounded overflow-hidden ">
            <input
              type="file"
              accept="image/*"
              // onChange={(e) => setFile(e.target?.files![0])}
              onChange={(e) => {
                setFile(e.target?.files![0]);
                const reader = new FileReader();
                reader.onload = () => {
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(e.target.files![0]);
              }}
              className="py-20 w-full absolute z-20 h-full top-0 opacity-0 cursor-pointer"
            />
            {image && (
              <img
                className="h-full object-cover object-center w-full relative z-10 rounded"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : sessionToken?.profilePicture || noImage
                }
              />
            )}
          </div>
          {/* {!image && ( */}
          <>
            <LuImagePlus className="text-slate-400 w-6 h-6" />
            <p className="text-[#7E88C3] text-sm mt-2">Upload logo</p>
          </>
          {/* )} */}
        </div>
        <hr className="my-5" />

        <div className="grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-12 sm:col-span-6">
            <input type="hidden" value={sessionToken?.id} {...register("id")} />
            <Input
              label="Company Name"
              id="companyName"
              required
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              label="Company Address"
              id="companyAddress"
              required
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <input type="hidden" value={sessionToken?.id} {...register("id")} />
            <Input
              label="Company Phone"
              id="companyPhone"
              required
              register={register}
              errors={errors}
            />
          </div>

          <div className="col-span-12">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 p-2 bg-primary text-white rounded-md px-4 ${
                loading && "cursor-not-allowed bg-primary/60"
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Updating Settings</span>
                </>
              ) : (
                "Update settings"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SettingsComp;
