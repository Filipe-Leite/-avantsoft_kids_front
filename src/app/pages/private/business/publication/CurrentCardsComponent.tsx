import { useEffect, useState } from "react";
import './currentCardsComponent.css';
import QuoteCard from "./QuoteCard";
import IconAddButton from '../../../../../assets/add-icon-white.png';
import { createCurrentCard, getUserCurrentCards } from "../../../../../features/sessionBusiness/sessionCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import Modal from "../../../../components/modals/chooseCardTypeModal";

interface CardType {
  id: number;
  name: string;
}

export default function CurrentCardsComponent(){
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const currentUser = useSelector((state: RootState) => state.session.currentUser);
    const currentCards = useSelector((state: RootState) => state.sessionCards.currentCards);
    const [inputSutopicQuoteCard, setInputSutopicQuoteCard] = useState('');
    const [addCardClicked, setAddCardClicked] = useState(true);
    const [isCardTypeModalOpen, setIsCardTypeModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const safeCurrentCards = Array.isArray(currentCards) ? currentCards : [];

    useEffect(() => {
        async function handleGetUserCurrentCards(){
            if(authHeaders && currentUser?.id){
                try {
                    const response = await dispatch(getUserCurrentCards({
                        authHeaders: authHeaders,
                        userId: currentUser.id
                    })).unwrap();
                    console.log('Cards carregados:', response);
                } catch (error) {
                    console.error('Erro ao carregar cards:', error);
                }
            } 
        }

        handleGetUserCurrentCards();
    }, [dispatch, authHeaders, currentUser?.id]);

    const cardTypes: CardType[] = [
        { id: 1, name: "quote" },
        { id: 2, name: "summary" },
        { id: 3, name: "comment" },
        { id: 4, name: "bibliographic" },
        { id: 5, name: "sketch" }
    ];

    async function handleCreatePostCurrentCard(cardTypeId: number){
        try {
            const response = await dispatch(createCurrentCard({
                authHeaders: authHeaders,
                cardTypeId: cardTypeId
            })).unwrap();

            if (response) {
                handleCloseModal();
                if (authHeaders && currentUser?.id) {
                    await dispatch(getUserCurrentCards({
                        authHeaders: authHeaders,
                        userId: currentUser.id
                    }));
                }
            }
        } catch (error) {
            console.error('Erro ao criar card:', error);
        }
    }

    async function handleCreateCurrentCard(){
        setIsCardTypeModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsCardTypeModalOpen(false);
    }

    return(
        <div id='container-current-cards-component'>
            <Modal 
                isOpen={isCardTypeModalOpen}
                onClose={handleCloseModal}
                title="Chose the card type"
                size="lg"
            >
                <div style={{ padding: '10px 0' }}>
                    <p style={{ 
                        margin: '0px', 
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        Select the card type:
                    </p>
                    
                    <div className='container-chose-type-buttons'  
                         style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        
                        {cardTypes.map((cardType) => (
                            <button
                                key={cardType.id}
                                onClick={() => handleCreatePostCurrentCard(cardType.id)}
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
                                    e.currentTarget.style.borderColor = '#000000ff';
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
                                backgroundColor: 'rgb(47,47,47)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
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
                
                <ul className='ul-current-cards'>
                    {safeCurrentCards.length > 0 ? (
                        safeCurrentCards.map((card, index) => (
                            card.cardTypeId === 1 ? (
                                <div id='container-li-card' key={card.id || index}>
                                    <QuoteCard
                                        id={card.id}
                                        subtopicId={card.subtopicId}
                                        subtopic={card.subtopic}
                                        quote={card.quote}
                                        cardType={card.cardTypeId}
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
                    ) : (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '40px', 
                            color: '#666',
                            fontSize: '16px'
                        }}>
                            Nenhum card encontrado
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}