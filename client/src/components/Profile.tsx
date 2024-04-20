import { Dialog, DialogContent } from "./ui/dialog";
import { userProfileStore } from "../store/model";
import { useEffect, useState } from "react";
import { useSessionToken, useInvoices, useUserInfo } from "../store/invoice";
import { toast, Toaster } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { updateUserProfile } from "../apicalls/users";

import { FiLoader } from "react-icons/fi";

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import noImage from "../assets/no-image.jpeg";
import Input from "./Input";

const Profile = () => {
  const { sessionToken } = useSessionToken();
  const { fetchData } = useInvoices();

  const [file, setFile] = useState<
    File | Blob | FileList | null | undefined | any
  >();
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { openUserProfileModal, setOpenUserProfileModal } = userProfileStore();
  const { fetchUserInfo, user } = useUserInfo();

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

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [user, openUserProfileModal]);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isLoading },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // file && uploadFile();
    fetchUserInfo();

    updateUserProfile({
      _id: sessionToken?._id,
      username: data.username,
      email: data.email,
      profilePicture: image || sessionToken?.profilePicture,
    }).then((response) => {
      if (response) {
        fetchData();
        toast.success("Profile Updated Successfully");
        fetchUserInfo();
        setOpenUserProfileModal(false);
      } else {
        toast.error("Profile Update Failed");
      }
    });
  };

  return (
    <div>
      <Dialog
        open={openUserProfileModal}
        onOpenChange={(openUserProfileModal) => {
          setOpenUserProfileModal(openUserProfileModal);

          if (!openUserProfileModal) {
            reset();
            setFile(null);
            // setFile(
            //   new File([""], "filename", {
            //     type: "image/png",
            //   })
            // );
          }
        }}
      >
        <DialogContent className="sm:max-w-fit md:min-w-[40rem]">
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            {loading && (
              <div className="w-full h-full absolute top-0 left-0 bg-black/10 z-30 cursor-wait">
                <div className="w-full h-full flex items-center justify-center">
                  <FiLoader className="animate-spin text-4xl text-white" />
                </div>
              </div>
            )}
            <div
              className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
              style={{
                backgroundImage: "url(https://i.ibb.co/FWggPq1/banner.png)",
              }}
            >
              <div
                className={`absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full overflow-hidden border-[4px]  bg-pink-400 `}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target?.files![0])}
                  className="py-20 w-full absolute z-20 h-full top-0 opacity-0 cursor-pointer"
                />{" "}
                <img
                  className="h-32 object-cover object-center w-full relative z-10 "
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : sessionToken?.profilePicture || noImage
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-16">
              <div className="col-span-12 sm:col-span-6">
                <input
                  type="hidden"
                  value={sessionToken?.id}
                  {...register("id")}
                />
                <Input
                  label="Username"
                  id="username"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Input
                  label="Email"
                  id="email"
                  required
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-span-12">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 p-2 bg-primary text-white rounded-full w-full px-4 ${
                    loading && "cursor-not-allowed bg-primary/60"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      <span>Saving Profile</span>
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default Profile;
