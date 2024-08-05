'use client'
import Carrousel from "@/components/carrousel/Carrousell";
import ComicList from "@/components/comicListTest/ComicListTest";
import CreatorList from "@/components/creatorListTest/CreatorListTest";
import TrendingComics from "@/components/trendingComics/TrendingComics";
import TrendingCreators from "@/components/trendingCreators/TrendingCreators";
import { comicsPreload, creatorsPreload, trendingPreload } from "public/data";
import styles from "@/components/backgrounds/experiment.module.css";
import { usePathname, useRouter } from "next/navigation";

function home() {

  const router = useRouter();

  const pathname = usePathname();

    return(
        
        <main className={styles.fondo}>
            <div className="pt-36"> 
                <Carrousel />
            </div>
            
            <section>
            <img src="/images/tendencia.png" className="max-w-xl flex ml-auto mr-6 pt-56 pb-10 "/>        
            <div className="flex flex-row justify-center space-x-6">
                    <TrendingComics comics={trendingPreload} />
            </div>
            </section>

            <section>
            <img src="/images/creadoresPopulares.png" className="max-w-xl flex mr-auto ml-6 "/>        
            <div className="flex flex-row justify-center space-x-6">
                    <TrendingCreators creators={creatorsPreload} />
            </div>
            </section>

            <section className="flex flex-row justify-evenly pb-16">
            <button type="button" onClick={() => router.push('/all-comics')}>
            <img src="/images/comicsBtn.png" className="max-w-sm flex ml-auto mr-auto
            transition-all custom-transition duration-500 hover:scale-105"/>
            </button>

            <button type="button" onClick={() => router.push('/all-comics')}>
            <img src="/images/creadoresBtn.png" className="max-w-sm flex ml-auto mr-auto
            transition-all custom-transition duration-500 hover:scale-105"/>
            </button>
            </section>


            {/* <section id="comicsHome">
            <img src="/images/comicsBtn.png" className="max-w-sm flex ml-auto mr-auto "/>        
            <div className="flex flex-row justify-center space-x-6">
            <ComicList comics={comicsPreload} />
            </div>
            </section>

            <section id="creatorsHome">
            <img src="/images/creadoresBtn.png" className="max-w-sm flex ml-auto mr-auto "/>        
            <div className="flex flex-row justify-center space-x-6">
            <CreatorList creators={creatorsPreload} />
            </div>
            </section> */}

        </main>
    
    )
}

export default home;





// 'use client'
// import React, { useEffect, useState } from "react";
// import Carrousel from "@/components/carrousel/Carrousell";
// import ComicList from "@/components/comicListTest/ComicListTest";
// import CreatorList from "@/components/creatorListTest/CreatorListTest";
// import TrendingComics from "@/components/trendingComics/TrendingComics";
// import TrendingCreators from "@/components/trendingCreators/TrendingCreators";
// import { comicsPreload, creatorsPreload, trendingPreload } from "public/data";
// import styles from "@/components/backgrounds/experiment.module.css";
// import { IComicTest, ICreatorTest, IComic } from "@/interface";

// async function fetchComics(): Promise<IComic[]> {
//   try {
//     console.log("Fetching comics from data.json...");
//     const response = await fetch("http://localhost:3000/comics");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const comics: IComic[] = await response.json();
//     console.log("Fetched comics successfully", comics);
//     return comics;
//   } catch (error) {
//     console.error("Error fetching comics:", error);
//     return []; // Return an empty array in case of an error
//   }
// }

// const Home: React.FC = () => {
//   const [comics, setComics] = useState<IComic[]>([]);
//   const [creators, setCreators] = useState<ICreatorTest[]>([]);
  

//   useEffect(() => {
//     fetchComics().then((data) => {
//       setComics(data);
//     });

//     // Mocking creators data for now
//     setCreators(creatorsPreload);
//   }, []);

//   const trendingComics = comics.slice(0, 5);

//   return (
//     <main className={styles.fondo}>
//       <div className="pt-36">
//         <Carrousel />
//       </div>

//       <section>
//         <img
//           src="/images/tendencia.png"
//           className="max-w-xl flex ml-auto mr-6 pt-56 pb-10 "
//           alt="Trending"
//         />
//         <div className="flex flex-row justify-center space-x-6">
//           <TrendingComics comics={trendingComics} />
//         </div>
//       </section>

//       <section>
//         <img
//           src="/images/creadoresPopulares.png"
//           className="max-w-xl flex mr-auto ml-6 "
//           alt="Popular Creators"
//         />
//         <div className="flex flex-row justify-center space-x-6">
//           <TrendingCreators creators={creatorsPreload} />
//         </div>
//       </section>

//       <section id="comicsHome">
//         <img
//           src="/images/comicsBtn.png"
//           className="max-w-sm flex ml-auto mr-auto "
//           alt="Comics"
//         />
//         <div className="flex flex-row justify-center space-x-6">
//           <ComicList comics={comics} />
//         </div>
//       </section>

//       <section id="creatorsHome">
//         <img
//           src="/images/creadoresBtn.png"
//           className="max-w-sm flex ml-auto mr-auto "
//           alt="Creators"
//         />
//         <div className="flex flex-row justify-center space-x-6">
//           <CreatorList creators={creatorsPreload} />
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;
