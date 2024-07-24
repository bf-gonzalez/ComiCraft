import { Url } from "url"

interface IEvent{
    id: string
    name: string
    img: Url
    date: Date
    description: string
    price: number
}

export default IEvent;