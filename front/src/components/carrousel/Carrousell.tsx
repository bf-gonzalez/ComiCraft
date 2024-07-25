import React from "react";

const Carrousel: React.FC = () => {
    return (
        <div className="flex items-center relative w-[98vw] h-[300px] border-none bg-none border-0">
            <img 
                src="/images/carrousel2.png" 
                className="absolute ml-24 top-0 opacity-0 animate-display w-[72vw]"
                style={{ animationDelay: '.5s' }}
            />
            <img 
                src="/images/carrousel3.png" 
                className="absolute ml-24 top-0 opacity-0 animate-display w-[72vw]"
                style={{ animationDelay: '6s' }}
            />
            <img 
                src="/images/carrousel4.png" 
                className="absolute ml-24 top-0 opacity-0 animate-display w-[72vw]"
                style={{ animationDelay: '11s' }}
            />
        </div>
    );
}

export default Carrousel;