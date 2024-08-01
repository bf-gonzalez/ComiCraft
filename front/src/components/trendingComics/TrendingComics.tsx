import { IComicListProps, IComicTest } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";
import ComicSlideCard from "../comicSlideCard/ComicSlideCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function TrendingComics ({comics}: IComicListProps) {
    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap justify-evenly">
                {comics.map((comic: IComicTest) => (
                    <ComicSlideCard comic={comic} key={comic.id} />
                ))}
            </section>
        </main>
    );
}

export default TrendingComics;