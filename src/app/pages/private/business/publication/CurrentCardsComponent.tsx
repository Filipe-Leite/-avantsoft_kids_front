import { useState } from "react";
import { Card } from "../../../../#interfaces/slicesInterfaces";
import './currentCardsComponent.css';
import QuoteCard from "./QuoteCard";
import IconAddButton from '../../../../../assets/add-icon-white.png';
import { createCurrentCard } from "../../../../../features/sessionBusiness/sessionCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";

export default function CurrentCardsComponent(){
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [inputSutopicQuoteCard, setInputSutopicQuoteCard] = useState('');
    const [addCardClicked, setAddCardClicked] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    async function handleCreateCurrentCard(){

        const response = await dispatch(createCurrentCard({authHeaders: authHeaders})) 
    }

    const newCard: Card = 
        {
            id: undefined,
            subtopicId: undefined,
            subtopic: undefined,
            quote: "",
            cardType: 1,
            comment: "",
            edition: "",
            city: "",
            year: new Date("2023-05-15"),
            internetAccessDate: new Date("2024-01-10"),
            internetAccessLink: "",
            userId: 1,
            sourceId: 1,
            source: {
                id: 1,
                title: "",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            authorId: 1,
            authors: [{
                id: 1,
                name: "",
                reference: ""
            }],
            publisherId: 1,
            publisher: {
                id: 1,
                name: ""
            },
            locationId: 1,
            location: {
                id: 1,
                name: ""
            },
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15")
        }

    

   const cards: Card[] = [
        {
            id: 1,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            cardType: 1,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            edition: "1ª Edição",
            city: "São Paulo",
            year: new Date("2023-05-15"),
            internetAccessDate: new Date("2024-01-10"),
            internetAccessLink: "https://exemplo.com/ia-etica",
            userId: 1,
            sourceId: 1,
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            authorId: 1,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15")
        },
        {
            id: 2,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "2ª Edição Revisada",
            city: "Rio de Janeiro",
            year: new Date("2022-11-20"),
            internetAccessDate: new Date("2024-01-08"),
            internetAccessLink: "https://exemplo.com/mudancas-climaticas",
            userId: 2,
            sourceId: 3,
            authorId: 5,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-12"),
            updatedAt: new Date("2024-01-14")
        },
        {
            id: 3,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "Edição Especial",
            city: "Belo Horizonte",
            year: new Date("2023-08-30"),
            internetAccessDate: new Date("2024-01-05"),
            internetAccessLink: "https://exemplo.com/blockchain-defi",
            userId: 3,
            sourceId: 7,
            authorId: 12,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-10")
        },
        {
            id: 4,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "3ª Edição Ampliada",
            city: "Porto Alegre",
            year: new Date("2021-03-10"),
            internetAccessDate: new Date("2024-01-03"),
            internetAccessLink: "https://exemplo.com/psicologia-cognitiva",
            userId: 1,
            sourceId: 15,
            authorId: 8,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-08"),
            updatedAt: new Date("2024-01-09")
        },
        {
            id: 5,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "Edição Internacional",
            city: "Curitiba",
            year: new Date("2023-12-01"),
            internetAccessDate: new Date("2024-01-01"),
            internetAccessLink: "https://exemplo.com/arquitetura-sustentavel",
            userId: 4,
            sourceId: 22,
            authorId: 3,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-05"),
            updatedAt: new Date("2024-01-07")
        },
        {
            id: 6,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "1ª Edição Digital",
            city: "Brasília",
            year: new Date("2023-07-22"),
            internetAccessDate: new Date("2023-12-28"),
            internetAccessLink: "https://exemplo.com/economia-comportamental",
            userId: 2,
            sourceId: 9,
            authorId: 17,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-04")
        },
        {
            id: 7,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "2ª Edição Atualizada",
            city: "Salvador",
            year: new Date("2022-09-14"),
            internetAccessDate: new Date("2023-12-25"),
            internetAccessLink: "https://exemplo.com/medicina-personalizada",
            userId: 5,
            sourceId: 31,
            authorId: 6,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-02")
        },
        {
            id: 8,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "2ª Edição Atualizada",
            city: "Salvador",
            year: new Date("2022-09-14"),
            internetAccessDate: new Date("2023-12-25"),
            internetAccessLink: "https://exemplo.com/medicina-personalizada",
            userId: 5,
            sourceId: 31,
            authorId: 6,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-02")
        },
        {
            id: 9,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "2ª Edição Atualizada",
            city: "Salvador",
            year: new Date("2022-09-14"),
            internetAccessDate: new Date("2023-12-25"),
            internetAccessLink: "https://exemplo.com/medicina-personalizada",
            userId: 5,
            sourceId: 31,
            authorId: 6,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-02")
        },
        {
            id: 10,
            subtopicId: undefined,
            subtopic: {
                id: 1,
                name: "Direito empresarial"
            },
            quote: "",
            cardType: 1,
            comment: "",
            edition: "2ª Edição Atualizada",
            city: "Salvador",
            year: new Date("2022-09-14"),
            internetAccessDate: new Date("2023-12-25"),
            internetAccessLink: "https://exemplo.com/medicina-personalizada",
            userId: 5,
            sourceId: 31,
            authorId: 6,
            authors:[{
                id: 1,
                name: "Machado de Assis",
                reference: "ASSIS, Marchado de"
            }],
            source:{
                id: 1,
                title: "Memórias póstumas de Brás Cubas",
                createdAt: "2024-01-10",
                updatedAt: "2024-01-10"
            },
            publisherId: 1,
            publisher:{
                id: 1,
                name: "Brasilienne"
            },
            locationId: 1,
            location: {
                id: 1,
                name: "Biblioteca Nacional do Rio de Janeiro"
            },
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-02")
        }
    ];

    return(
        <div id='container-current-cards-component'>
            <div id='container-ul-current-cards'>
                <button className="button-add-new-quote-card"
                        onClick={handleCreateCurrentCard}>
                    <img src={IconAddButton} alt='icon-add-card'/>
                </button>
                <ul>
                    {cards.length !== 0 ? (
                        cards.map((card, index) => (
                        card.cardType === 1 ? (
                            <div id='container-li-card' key={index}>
                                <QuoteCard
                                    id={card.id}
                                    subtopicId={card.subtopicId}
                                    subtopic={card.subtopic}
                                    quote={card.quote}
                                    cardType={card.cardType}
                                    comment={card.comment}
                                    edition={card.edition}
                                    city={card.city}
                                    year={card.year}
                                    internetAccessDate={card.internetAccessDate}
                                    internetAccessLink={card.internetAccessLink}
                                    userId={card.userId}
                                    sourceId={card.sourceId}
                                    source={card.source}
                                    authors={card.authors}
                                    publisher={card.publisher}
                                    location={card.location}
                                    inputSutopicQuoteCard={inputSutopicQuoteCard}
                                    setInputSutopicQuoteCard={setInputSutopicQuoteCard}
                                    addCardClicked={addCardClicked}
                                    setAddCardClicked={setAddCardClicked}
                                />
                            </div>
                        ) : null
                        ))
                    ) : null}
                </ul>
            </div>
        </div>
    )
};

function ueState(): [any, any] {
    throw new Error("Function not implemented.");
}
