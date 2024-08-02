import { IComicListProps, IComicTest, ICreatorListProps, ICreatorTest } from "@/interface";
import { Josefin_Sans } from "next/font/google";
import ComicCard from "../comicCard/ComicCard";
import ComicSlideCard from "../comicSlideCard/ComicSlideCard";
import CreatorSlideCard from "../creatorSlideCard/CreatorSlideCard";

const josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-josefin',
})

function TrendingCreators ({creators}: ICreatorListProps) {
    return(
        <main className="pt-12 pb-24 ml-12 mr-12 max-w-8xl">
            <section className="flex flex-row flex-wrap space-x-12 space-y-12 justify-evenly">
                {creators.map((creator: ICreatorTest) => (
                    <CreatorSlideCard creator={creator} key={creator.id} />
                ))}
            </section>
        </main>
    );
}

export default TrendingCreators;