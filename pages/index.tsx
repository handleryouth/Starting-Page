import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import { Squash as Hamburger } from "hamburger-react";
import { ImageResponse, QuotesResponse, TimeResponse } from "../types";
import { Detail, Quote, Time } from "../components";

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [quote, time, image]: [QuotesResponse, TimeResponse, ImageResponse] =
    data;

  const [timeData, setTimeData] = useState<TimeResponse>(time);
  const [open, setOpen] = useState<boolean>(false);

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 10);
  }, []);

  const handleRefreshClock = useCallback(() => {
    axios.get("http://worldtimeapi.org/api/ip").then((res) => {
      setTimeData(res.data);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      handleRefreshClock();
    }, 60000);
  }, [handleRefreshClock]);

  return (
    <>
      <div className="absolute w-full h-screen">
        <Image
          src={image.hits[randomNumber].largeImageURL}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Detail open={open} setOpen={setOpen} {...time} />
      <div className="absolute z-10 flex justify-center items-center flex-col h-screen w-full bg-black bg-opacity-40">
        <Time {...timeData} />
        <Quote {...quote} />
        <div className="mt-4 text-white">
          <Hamburger toggled={open} toggle={setOpen} />
        </div>
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
