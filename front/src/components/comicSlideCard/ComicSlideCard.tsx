'use client'
import { IComicProps } from "@/interface";
import { useRouter } from "next/navigation";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['600'],
    variable: '--font-josefin',
});
const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function ComicSlideCard({ comic }: IComicProps) {
    const router = useRouter();
    const handleComicClick = () => {
        router.push(`/comic/${comic.id}`);
    };

    return (
        <main className="flex flex-col items-center text-center">
            <button onClick={handleComicClick}
            className="hover:scale-105 duration-300 relative pl-4 pr-4">

                
                <div className="relative">
                    <img
                        src={comic.image}
                        alt={comic.name}
                        className="rounded-xl border-2 h-[70vh] w-56 object-cover object-center border-blue-700 border-opacity-70 p-2"
                        height={600}
                    />

            
                    <div className="opacity-0 absolute inset-0 flex flex-col justify-end items-center p-4 bg-black bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 rounded-xl duration-300">
                        <h2 className={`${bebas.variable} font-sans text-4xl text-yellow-400`}>
                            {comic.name}
                        </h2>
                        <p className={`${bebas.variable} font-sans text-sm text-rose-600`}>
                            {comic.author}
                        </p>
                    </div>
                </div>
            </button>
        </main>
    );
}

export default ComicSlideCard;
