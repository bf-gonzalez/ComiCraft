'use client'


export default function Search ({ placeholder}: {placeholder: string}) {
    function handleSearch (term:string) {
        console.log(term);
    }

    return (

        <div>
            <label htmlFor="Search" className="sr-only"> 
                Search
            </label>
            <input
            className=""
            placeholder= {placeholder}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            />

        </div>

    );
}