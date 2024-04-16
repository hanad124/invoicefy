import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { BiChevronRight } from "react-icons/bi";
import { useInvoices } from "../store/invoice";
import Autoplay from "embla-carousel-autoplay";
import { Progress } from "./ui/progress";
import { TInvoice } from "../types/invoice";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { FiCheckCircle, FiXCircle, FiCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  const { data } = useInvoices();
  const [status, setStatus] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) {
      const status = data.reduce((acc, curr) => {
        if (!acc[curr.status]) {
          acc[curr.status] = 1;
        } else {
          acc[curr.status] += 1;
        }
        return acc;
      }, {});
      setStatus(status);
    }
  }, [data]);

  return (
    <Carousel
      className=" "
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="min-w-fit-content md:max-w-[27rem]">
        <CarouselItem>
          <Card className="borderstyle ">
            <CardHeader>
              <CardTitle className="text-slate-700 dark:text-slate-400 text-2xl">
                Latest Invoices
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>Overview of recent invoices</span>
                <span
                  className="flex items-center gap-1 text-primary cursor-pointer"
                  onClick={() => {
                    navigate("/invoice");
                  }}
                >
                  <span className="text-sm ">View All</span>
                  <BiChevronRight className="text-lg font-light " />
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  // backgroundColor: "#fff",
                  borderRadius: "15px",
                }}
              >
                {Array.isArray(data) &&
                  data.slice(0, 4).map((invoice: TInvoice) => (
                    <div
                      className={`flex items-center justify-between py-3 ${
                        data.length === 1 ? "" : "border-b border-dashed "
                      }`}
                      key={invoice._id}
                    >
                      <div className="flex items-center justify-between ">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-[15px] ${
                            invoice.status === "paid"
                              ? "bg-green-400/20"
                              : "bg-red-400/20"
                          }
                  }`}
                        >
                          {invoice.status === "paid" ? (
                            <FiCheckCircle className="text-green-500 text-2xl" />
                          ) : invoice.status === "pending" ? (
                            <FiCircle className="text-yellow-500 text-2xl" />
                          ) : (
                            <FiXCircle className="text-red-500 text-2xl" />
                          )}
                        </div>
                        <div className="ml-4">
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            className={`dark:text-slate-200 text-slate-700 flex flex-col`}
                          >
                            <span className={` font-medium text-[14px]`}>
                              {" "}
                              {invoice.description.slice(0, 30) +
                                (invoice.description.length > 30 ? " ..." : "")}
                            </span>
                            <span className=" text-sm font-light text-slate-500">
                              {new Date(invoice.invoiceDate).toLocaleDateString(
                                "en-US",
                                {
                                  // weekday: "long",
                                  month: "long",
                                  year: "numeric",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          className="dark:text-slate-200 text-slate-700"
                        >
                          <span
                            className={`${
                              invoice.status === "paid"
                                ? "text-green-500"
                                : invoice.status === "pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {" "}
                            {invoice.status === "paid" ? (
                              <span className=" text-lg font-medium">
                                ${invoice.total}
                              </span>
                            ) : (
                              <span className="text-lg font-medium">
                                - ${invoice.total}
                              </span>
                            )}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card className="borderstyle">
            <CardHeader>
              <CardTitle className="text-slate-700 dark:text-slate-400 text-2xl">
                Invoices Status
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>Most used status</span>
                <Link to="/invoice">
                  <span className="flex items-center gap-1 text-primary cursor-pointer">
                    <span className="text-sm ">View All</span>
                    <BiChevronRight className="text-lg font-light " />
                  </span>
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "15px",
                }}
              >
                <div className="flex flex-col gap-3">
                  {Object.keys(status).map((key) => (
                    <div className="flex justify-between" key={key}>
                      <div className="w-full">
                        <div className="">
                          <Typography
                            fontSize={14}
                            fontWeight={400}
                            className="dark:text-slate-200 text-slate-700"
                          >
                            <span className="text-slate-500">{key}</span>
                          </Typography>
                        </div>

                        <Progress
                          className="bg-slate-200 dark:bg-slate-400 rounded-full w-full h-[5px] mt-2"
                          value={
                            (status[key] /
                              (Array.isArray(data) ? data.length : 1)) *
                            100
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselComponent;
