import { Card } from "../../../../#interfaces/slicesInterfaces";
import './currentCardsComponent.css';
import QuoteCard from "./QuoteCard";
import QuoteCards from "./QuoteCard";

export default function CurrentCardsComponent(){
    
   const cards: Card[] = [
    {
        subject: "Inteligência Artificial e Ética",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        cardType: 1,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        edition: "1ª Edição",
        city: "São Paulo",
        year: new Date("2023-05-15"),
        internetAccessDate: new Date("2024-01-10"),
        internetAccessLink: "https://exemplo.com/ia-etica",
        userId: 1,
        resourceId: 1,
        authorId: 1,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
    },
    {
        subject: "Mudanças Climáticas Globais",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "2ª Edição Revisada",
        city: "Rio de Janeiro",
        year: new Date("2022-11-20"),
        internetAccessDate: new Date("2024-01-08"),
        internetAccessLink: "https://exemplo.com/mudancas-climaticas",
        userId: 2,
        resourceId: 3,
        authorId: 5,
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-14")
    },
    {
        subject: "Blockchain e Finanças Descentralizadas",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "Edição Especial",
        city: "Belo Horizonte",
        year: new Date("2023-08-30"),
        internetAccessDate: new Date("2024-01-05"),
        internetAccessLink: "https://exemplo.com/blockchain-defi",
        userId: 3,
        resourceId: 7,
        authorId: 12,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10")
    },
    {
        subject: "Psicologia Cognitiva Aplicada",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "3ª Edição Ampliada",
        city: "Porto Alegre",
        year: new Date("2021-03-10"),
        internetAccessDate: new Date("2024-01-03"),
        internetAccessLink: "https://exemplo.com/psicologia-cognitiva",
        userId: 1,
        resourceId: 15,
        authorId: 8,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-09")
    },
    {
        subject: "Arquitetura Sustentável Moderna",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "Edição Internacional",
        city: "Curitiba",
        year: new Date("2023-12-01"),
        internetAccessDate: new Date("2024-01-01"),
        internetAccessLink: "https://exemplo.com/arquitetura-sustentavel",
        userId: 4,
        resourceId: 22,
        authorId: 3,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-07")
    },
    {
        subject: "Economia Comportamental e Mercados",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "1ª Edição Digital",
        city: "Brasília",
        year: new Date("2023-07-22"),
        internetAccessDate: new Date("2023-12-28"),
        internetAccessLink: "https://exemplo.com/economia-comportamental",
        userId: 2,
        resourceId: 9,
        authorId: 17,
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-04")
    },
    {
        subject: "Medicina Personalizada e Genômica",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "2ª Edição Atualizada",
        city: "Salvador",
        year: new Date("2022-09-14"),
        internetAccessDate: new Date("2023-12-25"),
        internetAccessLink: "https://exemplo.com/medicina-personalizada",
        userId: 5,
        resourceId: 31,
        authorId: 6,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02")
    },
    {
        subject: "Medicina Personalizada e Genômica",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "2ª Edição Atualizada",
        city: "Salvador",
        year: new Date("2022-09-14"),
        internetAccessDate: new Date("2023-12-25"),
        internetAccessLink: "https://exemplo.com/medicina-personalizada",
        userId: 5,
        resourceId: 31,
        authorId: 6,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02")
    },
    {
        subject: "Medicina Personalizada e Genômica",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "2ª Edição Atualizada",
        city: "Salvador",
        year: new Date("2022-09-14"),
        internetAccessDate: new Date("2023-12-25"),
        internetAccessLink: "https://exemplo.com/medicina-personalizada",
        userId: 5,
        resourceId: 31,
        authorId: 6,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02")
    },
    {
        subject: "Medicina Personalizada e Genômica",
        quote: "",
        cardType: 1,
        comment: "",
        edition: "2ª Edição Atualizada",
        city: "Salvador",
        year: new Date("2022-09-14"),
        internetAccessDate: new Date("2023-12-25"),
        internetAccessLink: "https://exemplo.com/medicina-personalizada",
        userId: 5,
        resourceId: 31,
        authorId: 6,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02")
    }
];

    return(
        <div id='container-current-cards-component'>
            <div id='container-ul-current-cards'>
                <ul>
                    {cards.length !== 0 ? (
                        cards.map((card, index) => (
                        card.cardType === 1 ? (
                            <div id='container-li-card' key={index}>
                                <QuoteCard
                                    subject={card.subject}
                                    quote={card.quote}
                                    cardType={card.cardType}
                                    comment={card.comment}
                                    edition={card.edition}
                                    city={card.city}
                                    year={card.year}
                                    internetAccessDate={card.internetAccessDate}
                                    internetAccessLink={card.internetAccessLink}
                                    userId={card.userId}
                                    resourceId={card.resourceId}
                                    authorId={card.authorId}
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