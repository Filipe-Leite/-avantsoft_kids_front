import { useParams } from "react-router-dom"

export default function Home(){
    const {sellerId} = useParams<{ sellerId: string }>();


    return(
        <h1>Home Page {sellerId}</h1>
    )
}