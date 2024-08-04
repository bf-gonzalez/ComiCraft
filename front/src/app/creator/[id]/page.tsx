'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComicPage from "@/components/comicPage/ComicPage";
import { IComicTest, ICreatorTest } from "@/interface";
import { comicsPreload, creatorsPreload } from "public/data";
import ComicListRectangles from "@/components/comicListRectangles/ComicListRectangles";
import CreatorPage from "@/components/creatorPage/CreatorPage";
import styles from "@/components/backgrounds/experiment.module.css";

const CreatorDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id
    const [creator, setCreator] = useState<ICreatorTest | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const selectedCreator = creatorsPreload.find(
                (creator) => creator.id === String(id)
            );

            setCreator(selectedCreator || null);
            setLoading(false);
          }
        }, [id]);
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (!creator) {
          return <div>Creator not found</div>;
        }
      
        
        return (
            <main className={styles.fondo}>

            <CreatorPage creator={creator} />

            <div className="">
            <img src= "/images/masComics.png"
            className="max-w-sm ml-auto mr-auto "
            height={400} />
            <ComicListRectangles comics={comics} limit={6} />
            </div>

            </main>
        )
      };
      
      export default CreatorDetailPage;






