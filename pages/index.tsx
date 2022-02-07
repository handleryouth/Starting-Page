import { useCallback, useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { Squash as Hamburger } from "hamburger-react";
import { ImageResponse, SearchTemplate } from "types";
import { Detail, Quote, Time } from "components";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  const quote = useSWR("https://api.quotable.io/random");
  const image = useSWR(
    `https://pixabay.com/api/?key=22826797-0e3c3eea9b85a7ce6aee2bbb7&category=nature&min_width=1920&min_height=1080&editors_choice=true&per_page=10&color=black`
  );

  const [date, setDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const { register, watch } = useForm<SearchTemplate>();
  const router = useRouter();

  const handleSubmitSearch = useCallback(
    (value: string) => {
      router.push(
        "https://www.google.com/search?q=" + value.replaceAll(" ", "+")
      );
    },
    [router]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const randomNumber = useMemo(() => Math.floor(Math.random() * 10), [image]);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

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
        {image.data && (
          <Image
            src={
              (image.data as ImageResponse).hits[Math.floor(randomNumber)]
                .largeImageURL
            }
            alt="Background Image"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <Detail open={open} setOpen={setOpen} date={date} />
      <div className="absolute z-10 flex justify-center items-center flex-col h-screen w-full bg-black bg-opacity-40 min-h-160">
        <Time date={date} />
        <Quote {...quote.data} />

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

export default Home;
