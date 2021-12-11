import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Squash as Hamburger } from "hamburger-react";
import {
  ImageResponse,
  QuotesResponse,
  SearchTemplate,
  TimeResponse,
} from "../types";
import { Detail, Quote, Time } from "../components";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [quote, time, image]: [QuotesResponse, TimeResponse, ImageResponse] =
    data;

  const [timeData, setTimeData] = useState<TimeResponse | undefined>(time);
  const [open, setOpen] = useState<boolean>(false);
  const { register, watch } = useForm<SearchTemplate>();
  const router = useRouter();

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 10);
  }, []);

  const handleRefreshClock = useCallback(() => {
    axios.get("http://worldtimeapi.org/api/ip").then((res) => {
      setTimeData(res.data);
    });
  }, []);

  const handleSubmitSearch = useCallback(
    (value: string) => {
      router.push(
        "https://www.google.com/search?q=" + value.replaceAll(" ", "+")
      );
    },
    [router]
  );

  useEffect(() => {
    setInterval(() => {
      handleRefreshClock();
    }, 60000);

    return () => {
      setTimeData(undefined);
    };
  }, [handleRefreshClock]);

  return (
    <>
      <Head>
        <title>Starting Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Starting Page For Browser" />
        <meta name="keywords" content="NextJS, Tailwind CSS, React" />
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="author" content="handleryouth" />
      </Head>

      <div
        className={`absolute z-20 text-white border-2 rounded mt-2 ml-2 ${
          open && "hidden"
        }`}
      >
        <Hamburger toggled={open} toggle={setOpen} size={18} />
      </div>

      <div className="absolute w-full h-screen min-h-160">
        <Image
          src={image.hits[randomNumber].largeImageURL}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Detail open={open} setOpen={setOpen} {...time} />
      <div className="absolute z-10 flex justify-center items-center flex-col h-screen w-full bg-black bg-opacity-40 min-h-160">
        <Time {...timeData!} />
        <Quote {...quote} />

        <input
          {...register("search")}
          placeholder="Ask Google !"
          className="!phone:w-96 text-white mt-4 bg-transparent border-b-2 border-white font-body text-center text-md phone:text-xl px-2 w-4/6 focus:outline-none pb-2"
          onKeyDown={(e) => {
            e.key === "Enter" && handleSubmitSearch(watch("search"));
          }}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let endpoints = [
    "https://api.quotable.io/random",
    "http://worldtimeapi.org/api/ip",
    "https://pixabay.com/api/?key=22826797-0e3c3eea9b85a7ce6aee2bbb7&category=nature&min_width=1920&min_height=1080&editors_choice=true&per_page=10&color=black",
  ];
  const responseData = await axios
    .all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then((res) => {
      return res.map((r) => r.data);
    });

  return {
    props: { data: responseData },
  };
};

export default Home;
