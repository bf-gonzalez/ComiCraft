"use client";
import { IComicTest } from "@/interface";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

interface ComicPageProps {
  comic: IComicTest;
}

const ComicPage: React.FC<ComicPageProps> = ({ comic }) => {
  return (
    <main className="">
      <img
        src={comic.image}
        alt={comic.name}
        className="rounded-xl border-2 max-h-96 border-rose-900 p-2"
        height={400}
      />

      <h2
        className={`${bebas.variable} font-sans text-3xl text-yellow-400 pt-4 max-w-64 flex-wrap`}
      >
        {comic.name}
      </h2>
      <p
        className={`${bebas.variable} font-sans text-xl text-white max-w-64 flex-wrap`}
      >
        {comic.author}
      </p>
    </main>
  );
};

export default ComicPage;
