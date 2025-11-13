import { useState } from "react";
import { Card } from "../../../../#interfaces/slicesInterfaces";
import './currentCardsComponent.css';
import QuoteCard from "./QuoteCard";
import IconAddButton from '../../../../../assets/add-icon-white.png';
import { createCurrentCard } from "../../../../../features/sessionBusiness/sessionCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import Modal from "../../../../components/modals/chooseCardTypeModal"; // Ajuste o caminho conforme necessário

interface CardType {
  id: number;
  name: string;
}

export default function CurrentCardsComponent(){
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [inputSutopicQuoteCard, setInputSutopicQuoteCard] = useState('');
    const [addCardClicked, setAddCardClicked] = useState(true);
    const [isCardTypeModalOpen, setIsCardTypeModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Mock data para tipos de card - você pode buscar da API ou Redux
    const cardTypes: CardType[] = [
        { id: 1, name: "quote" },
        { id: 2, name: "summary" },
        { id: 3, name: "comment" },
        { id: 4, name: "bibliographic" },
        { id: 5, name: "sketch" }
    ];

    async function handleCreatePostCurrentCard(){

        const response = await dispatch(createCurrentCard({authHeaders: authHeaders})) 
    }

    async function handleCreateCurrentCard(){
        // Abre o modal para escolher o tipo de card
        setIsCardTypeModalOpen(true);
    }

    const handleCardTypeSelect = (cardType: CardType) => {
        console.log('Tipo de card selecionado:', cardType);
        // Aqui você pode adicionar a lógica para criar o card com o tipo selecionado
        // Por exemplo: dispatch(createCurrentCard({ authHeaders, cardTypeId: cardType.id }))
        setIsCardTypeModalOpen(false);
        
        // Temporariamente, vamos criar o card normalmente
        dispatch(createCurrentCard({authHeaders: authHeaders}));
    }

    const handleCloseModal = () => {
        setIsCardTypeModalOpen(false);
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
        // ... seu array de cards existente (mantenha igual)
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
        // ... resto dos cards
    ];

    return(
        <div id='container-current-cards-component'>
            {/* Modal para escolher tipo de card */}
            <Modal 
                isOpen={isCardTypeModalOpen}
                onClose={handleCloseModal}
                title="Escolha o Tipo de Card"
                size="sm"
            >
                <div style={{ padding: '10px 0' }}>
                    <p style={{ 
                        marginBottom: '20px', 
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        Selecione o tipo de card que deseja criar:
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cardTypes.map((cardType) => (
                            <button
                                key={cardType.id}
                                onClick={() => handleCardTypeSelect(cardType)}
                                style={{
                                    padding: '12px 16px',
                                    border: '1px solid #e1e5e9',
                                    borderRadius: '6px',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.borderColor = '#007bff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    e.currentTarget.style.borderColor = '#e1e5e9';
                                }}
                            >
                                {cardType.name.charAt(0).toUpperCase() + cardType.name.slice(1)}
                            </button>
                        ))}
                    </div>
                    
                    <div style={{ 
                        marginTop: '20px', 
                        display: 'flex', 
                        justifyContent: 'flex-end' 
                    }}>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>

            <div id='container-ul-current-cards'>
                <button 
                    className="button-add-new-quote-card"
                    onClick={handleCreateCurrentCard}
                >
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