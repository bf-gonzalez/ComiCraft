import Carrousel from "@/components/carrousel/Carrousell";

function home() {

    return(
        
        <main className="h-auto bg-slate-950 ">
            <div className="pt-36"> 
                <Carrousel />
            </div>
            
            <section>
            <img src="/images/trendingAsset.png" className="w-96 flex ml-auto mr-6 pt-48 "/>        
            <div className="flex flex-row justify-center mt-12 space-x-6 pb-28">
                    <img src="/images/example1.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer "/>
                    <img src="/images/example2.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example3.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example4.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
                    <img src="/images/example5.png" className="w-52 hover:scale-105 custom-transition duration-500 cursor-pointer"/>
            </div>
            </section>

        </main>
    
    )
}

export default home;