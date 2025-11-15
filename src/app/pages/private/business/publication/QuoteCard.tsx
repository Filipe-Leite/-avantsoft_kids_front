import { Author, Location, Publisher, Source, Subtopic } from '../../../../#interfaces/slicesInterfaces';
import './quoteCard.css';
import logoBorderBlack from '../../../../../assets/apice_logo_white_backgroud_transparent_border_black.png'
import closeIcon from '../../../../../assets/close-icon-white-24.png';
import eraseIcon from '../../../../../assets/erase-icon-white-50.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getSearch, getSubtopics } from '../../../../../features/sessionBusiness/sessionNavigation';

interface QuoteCardsProps {
    id?: number;
    subtopicId?: number;
    subtopic?: Subtopic;
    quote: string;
    cardType: number;
    comment: string;
    edition: string;
    city: string;
    year: Date;
    internetAccessDate: Date;
    internetAccessLink: string;
    userId: number;
    publisher: Publisher
    sourceId: number;
    source: Source;
    authors: Author[];
    location: Location;
    inputSutopicQuoteCard: string;
    setInputSutopicQuoteCard: React.Dispatch<React.SetStateAction<string>>;
    addCardClicked: boolean;
    setAddCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuoteCards({
    id,
    subtopicId,
    subtopic,
    quote,
    cardType,
    comment,
    edition,
    city,
    year,
    internetAccessDate,
    internetAccessLink,
    userId,
    sourceId,
    source,
    authors,
    publisher,
    location,
    inputSutopicQuoteCard,
    setInputSutopicQuoteCard,
    addCardClicked,
    setAddCardClicked
}: QuoteCardsProps) {
    const [inputSubtopicCard, setInputSubtopicCard] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [subtopicSearchPage, setSubtopicSearchPage] = useState(1);
    const suptopicsSearch = useSelector((state: RootState) => state.sessionNavigation.subtopicsSearch);
    // const suptopicsSearch = [{title: "aefafafaef"}, {title: "aefafafaef"}, {title: "aefafafaef"}]
    
        useEffect(() => {
            const timeoutId = setTimeout(() => {
                async function fetchData() {
                    
                    await dispatch(getSearch({
                        authHeaders: authHeaders,
                        queryType: 'subtopic',
                        page: subtopicSearchPage,
                        searchTerm: inputSubtopicCard.trim()
                    }));
                }
                fetchData();
            }, 500);
    
            return () => clearTimeout(timeoutId);
        }, [inputSubtopicCard, subtopicSearchPage, subtopicSearchPage]);

    return(
        <li id='li-quote-card'>

            <button className='button-close-new-quote-card'>
                <img alt='close-icon' src={closeIcon}/>
            </button>

            <button className='button-erase-new-quote-card'>
                <img alt='erase-icon' src={eraseIcon}/>
            </button>

            <div id='container-quote-card-first-line'>
                <input 
                    className='input-subtopic-card'
                    type="text"
                    value={inputSubtopicCard}
                    onChange={(e) => setInputSubtopicCard(e.target.value)}
                />
                {
                    inputSubtopicCard.length > 0 ? (
                        <ul className='ul-subtopics-card'>
                            {suptopicsSearch.length > 0 ? (
                                suptopicsSearch.map((subtopic, index) => 
                                    subtopic.name.length > 0 ? (
                                        <li key={index}>
                                            {subtopic.name}
                                        </li>
                                    ) : null
                                )
                            ) : (
                                <li className="add-new-subtopic">
                                    Add "{inputSubtopicCard}"
                                </li>
                            )}
                        </ul>
                    ) : null
                }
            </div>
                
            <div id='container-quote-card-second-line'>
                <div id='container-quote-card-second-line-left'>
                    <p className='p-quote-card-description'><strong>Quote:</strong></p> 
                    <p className='p-quote-card'>{quote}</p>
                </div>
                <div id='container-quote-card-second-line-right'>
                    <p className='p-quote-card-description'><strong>Comment:</strong></p> 
                    <p className='p-quote-card'>{comment}</p>
                </div>
            </div>
            <div id='container-quote-card-third-line'>
                <div id='container-quote-card-third-line-left'>
                    <p className='p-quote-card-description'><strong>Author:</strong></p>
                    <p className='p-quote-card'>{authors?.length !== 0 ? (
                            authors?.map((author, index) => (
                            author.reference))) : null}
                    </p>
                </div>
                <div id='container-quote-card-third-line-right'>
                    <p className='p-quote-card-description'><strong>Source:</strong></p> 
                    {source && source.title ? <p className='p-quote-card'>{source.title}</p> : null}
                </div>
            </div>
            <div id='container-quote-card-forth-line'>
                <div className='container-quote-card-forth-line-item'>
                    <p className='p-quote-card-description'><strong>Edition:</strong></p>
                    <p className='p-quote-card'>{edition}</p>
                </div>
                <div className='container-quote-card-forth-line-item'>
                    <p className='p-quote-card-description'><strong>City:</strong></p> 
                    <p className='p-quote-card'>{city}</p>
                </div>
                <div className='container-quote-card-forth-line-item'>
                    <p className='p-quote-card-description'><strong>Publisher:</strong></p>
                    {publisher && publisher.name ? <p className='p-quote-card'>{publisher.name}</p> : null}
                </div>
                <div className='container-quote-card-forth-line-item'>
                    <p className='p-quote-card-description'><strong>Year:</strong></p> 
                    {internetAccessDate ?
                        <p className='p-quote-card'>{year.toLocaleDateString()}</p>
                        :
                    null
                    }
                </div>
            </div>
            <div id='container-quote-card-five-line'>
                <div id='container-quote-card-five-line-left'>
                    <p className='p-quote-card-description'><strong>Access Date:</strong></p>
                    {internetAccessDate ? 
                        <p className='p-quote-card'>{internetAccessDate.toLocaleDateString()}</p>
                        :
                    null
                    }
                </div>
                <div id='container-quote-card-five-line-right'>
                    <p className='p-quote-card-description'><strong>Source:</strong></p> 
                    {source && source.title ? <p className='p-quote-card'>{source.title}</p> : null}
                </div>
            </div>
            <div id='container-quote-card-six-line'>
                <p className='p-quote-card-description'><strong>Location:</strong></p>
                {location ?
                    <p className='p-quote-card'>{location.name}</p>
                :
                null
                }
            </div>
            <img className='quote-card-logo' src={logoBorderBlack} alt='logo-yellow-border-black'/>
        </li>
    )
}