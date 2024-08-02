import { IComicListProps, IComicTest } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function ComicList ({comics}: IComicListProps) {
    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap space-x-12 space-y-12 justify-evenly">
                {comics.map((comic: IComicTest) => (
                    <ComicCard comic={comic} key={comic.id} />
                ))}
            </section>
        </main>
    );
}

export default ComicList;