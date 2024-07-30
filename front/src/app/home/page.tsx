import Carrousel from "@/components/carrousel/Carrousell";
import ComicList from "@/components/comicListTest/ComicListTest";
import TrendingComics from "@/components/trendingComics/TrendingComics";
import { comicsPreload, trendingPreload } from "public/data";

function home() {

    return(
        
        <main className="h-auto bg-slate-950 ">
            <div className="pt-36"> 
                <Carrousel />
            </div>
            
            <section>
            <img src="/images/tendencia.png" className="max-w-xl flex ml-auto mr-6 pt-48 "/>        
            <div className="flex flex-row justify-center space-x-6">
                    <TrendingComics comics={trendingPreload} />
            </div>
            </section>

            <section>
            <img src="/images/creadoresPopulares.png" className="max-w-xl flex mr-auto ml-6 pt-2 "/>        
            <div className="flex flex-row justify-center mt-12 space-x-6 pb-28">
                    <img src="/images/example1.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer "/>
                    <img src="/images/example2.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example3.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example4.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example5.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
            </div>
            </section>

            <ComicList comics={comicsPreload} />

        </main>
    
    )
}

export default home;