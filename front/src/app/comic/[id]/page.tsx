'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComicPage from "@/components/comicPage/ComicPage";
import { IComicTest } from "@/interface";
import { comicsPreload } from "public/data";
import ComicListRectangles from "@/components/comicListRectangles/ComicListRectangles";

const ComicDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id
    const [comic, setComic] = useState<IComicTest | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const selectedComic = comicsPreload.find(
                (comic) => comic.id === Number(id)
            );

            setComic(selectedComic || null);
            setLoading(false);
          }
        }, [id]);
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (!comic) {
          return <div>Comic not found</div>;
        }
      
        
        return (
            <main className="h-auto bg-slate-950">

            <ComicPage comic={comic} />

            <div className="">
            <img src= "/images/masComics.png"
            className="max-w-sm ml-auto mr-auto "
            height={400} />
            <ComicListRectangles comics={comicsPreload} limit={6} />
            </div>

            </main>
        )
      };
      
      export default ComicDetailPage;






