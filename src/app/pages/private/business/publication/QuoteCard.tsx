import { Author, Location, Publisher, Source, Subtopic } from '../../../../#interfaces/slicesInterfaces';
import './quoteCard.css';
import logoBorderBlack from '../../../../../assets/apice_logo_white_backgroud_transparent_border_black.png'
import closeIcon from '../../../../../assets/close-icon-white-24.png';
import eraseIcon from '../../../../../assets/erase-icon-white-50.png';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getSearch } from '../../../../../features/sessionBusiness/sessionNavigation';
import ChooseSubtopicCardAssociationsModal from '../../../../components/modals/ChooseSubtopicCardAssociationsModal';
import { selectAuthorAssociated } from '../../../../../features/sessionBusiness/sessionCards';

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
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [subtopicSearchPage, setSubtopicSearchPage] = useState(1);
    const suptopicsSearch = useSelector((state: RootState) => state.sessionNavigation.subtopicsSearch);
    const suptopicsSearchLoading = useSelector((state: RootState) => state.sessionNavigation.loadingSubtopics);
    const authorsAssociationSearch = useSelector((state: RootState) => state.sessionCards.authorsAssossiationSearch);
    const authorsSearchLoading = useSelector((state: RootState) => state.sessionCards.loadingAuthors);
    const [subtopicSelected, setSubtopicSelected] = useState<Subtopic | null>(subtopic || null);
    const [authorsSelected, setAuthorsSelected] = useState<Author[] | null>(authors || null);
    const [inputSubtopicCard, setInputSubtopicCard] = useState<string>(
        subtopic?.name?.trim() || ''
    );
    const [showSubtopicDropdown, setShowSubtopicDropdown] = useState(false);
    const [showAuthorsDropdown, setShowAuthorsDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showChooseSubtopicCardAssociationsModal, setShowChooseSubtopicCardAssociationsModal] = useState(false);
    const [inputQuote, setInputQuote] = useState('');
    const [inputComment, setInputComment] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');
    const [showAuthorsDropDown, setShowAuthorsDropDown] = useState(true);
    const selectedAuthorsAssociation = useSelector((state: RootState) => state.sessionCards.selectedAuthorsAssociation);
    

    useEffect(() => {
        if (subtopicSelected) {
            setInputSubtopicCard(subtopicSelected.name);
            setShowSubtopicDropdown(false);
        }
    }, [subtopicSelected]);

    useEffect(() => {
        if (!inputSubtopicCard.trim()) {
            setShowSubtopicDropdown(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            async function fetchData() {
                await dispatch(getSearch({
                    authHeaders: authHeaders,
                    queryType: 'subtopic',
                    page: subtopicSearchPage,
                    searchTerm: inputSubtopicCard
                }));
                setShowSubtopicDropdown(true);
            }
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [inputSubtopicCard, subtopicSearchPage, authHeaders, dispatch]);

    useEffect(() => {

        if (!inputAuthor.trim()) {
            setShowAuthorsDropdown(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            async function fetchData() {
                await dispatch(getSearch({
                    authHeaders: authHeaders,
                    queryType: 'author',
                    page: 1,
                    searchTerm: inputAuthor
                }));
                setShowSubtopicDropdown(true);
            }
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);

    }, [inputAuthor, authHeaders, dispatch]);

    const handleSubtopicInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputSubtopicCard(value);
        setSubtopicSelected(null);
        
        if (value.trim()) {
            setShowSubtopicDropdown(true);
        } else {
            setShowSubtopicDropdown(false);
        }
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputAuthor(value);
        setShowAuthorsDropDown(true);

        if (value.trim()) {
            setShowSubtopicDropdown(true);
        } else {
            setShowSubtopicDropdown(false);
        }
    };

    const handleSubtopicSelect = (selectedSubtopic: Subtopic) => {
        setSubtopicSelected(selectedSubtopic);
        setInputSubtopicCard(selectedSubtopic.name);
        setShowSubtopicDropdown(false);
    };

    const handleAddNewSubtopic = () => {
        setShowSubtopicDropdown(false);
    };

    const handleInputFocus = () => {
        if (inputSubtopicCard.trim() && suptopicsSearch.length > 0) {
            setShowSubtopicDropdown(true);
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSubtopicDropdown(false);
        }, 200);
    };

    const handleSubtopicOptionClick = (subtopic: Subtopic) => {
        handleSubtopicSelect(subtopic);
    };

    const handleAuthorOptionClick = (author: Author) => {
        dispatch(selectAuthorAssociated(author));
        setInputAuthor('')
        setShowAuthorsDropdown(false);
    };

    const handleAddNewAuthor = () => {
        setShowAuthorsDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.querySelector('.dropdown-wrapper');
            const input = document.querySelector('.input-subtopic-card');
            
            if (dropdown && input && 
                !dropdown.contains(event.target as Node) && 
                !input.contains(event.target as Node)) {
                setShowAuthorsDropDown(false);
            }
        };

        if (showAuthorsDropDown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAuthorsDropDown]);

    return(
        <li id='li-quote-card'>

            {showChooseSubtopicCardAssociationsModal && (
                <ChooseSubtopicCardAssociationsModal 
                    isOpen={showChooseSubtopicCardAssociationsModal}
                    title={'Associate Subtopic to: '}
                    inputSubtopic={inputSubtopicCard}
                    onClose={() => setShowChooseSubtopicCardAssociationsModal(false)}
                />
            )}
            
            <button className='button-close-new-quote-card'>
                <img alt='close-icon' src={closeIcon}/>
            </button>

            <button className='button-erase-new-quote-card'>
                <img alt='erase-icon' src={eraseIcon}/>
            </button>

            <div id='container-quote-card-first-line' ref={dropdownRef}>
                <input 
                    className='input-subtopic-card'
                    maxLength={85}
                    type="text"
                    placeholder='Type the subtopic/title here'
                    value={inputSubtopicCard}
                    onChange={handleSubtopicInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                {!suptopicsSearchLoading && showSubtopicDropdown && inputSubtopicCard.length > 0 && (
                    <ul className='ul-subtopics-card'>
                        {suptopicsSearch.length > 0 ? (
                            suptopicsSearch.map((subtopic, index) => 
                                subtopic.name.length > 0 ? (
                                    <li 
                                        key={index}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            handleSubtopicOptionClick(subtopic);
                                        }}
                                        className="subtopic-option"
                                    >
                                        {subtopic.name}
                                    </li>
                                ) : null
                            )
                        ) : (
                            !suptopicsSearchLoading && (
                                <li 
                                    className="add-new-subtopic"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        handleAddNewSubtopic();
                                        setShowChooseSubtopicCardAssociationsModal(true);
                                    }}
                                >
                                    Add "{inputSubtopicCard}"
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
                
            <div id='container-quote-card-second-line'>
                <div id='container-quote-card-second-line-left'>
                    <p className='p-quote-card-description'><strong>Quote:</strong></p> 
                    <textarea className='textarea-quote-quote-card'
                        maxLength={1150}
                        placeholder="Type the quote here..."
                        autoComplete="off"
                        value={inputQuote}
                        onChange={(e) => setInputQuote(e.target.value)}
                    />
                </div>
                <div id='container-quote-card-second-line-right'>
                    <p className='p-quote-card-description'><strong>Comment:</strong></p> 
                    <textarea className='textarea-comment-quote-card'
                        maxLength={1150}
                        placeholder="Type the comment here..."
                        autoComplete="off"
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                    />
                </div>
            </div>
            <div id='container-quote-card-third-line'>
                <div id='container-quote-card-third-line-left'>
                    <label className='p-quote-card-label'><strong>Author:</strong></label>

                    <span>
                        {selectedAuthorsAssociation.reduce((acc, author, index) => {
                            return acc + (index > 0 ? ', ' : '') + author.name;
                        }, '')}
                    </span>

                    <input className='input-author-quote-card'
                        maxLength={55}
                        placeholder="Type the author here..."
                        autoComplete="off"
                        value={inputAuthor}
                        onChange={handleAuthorInputChange}
                    />
                    
                    {showAuthorsDropDown && !authorsSearchLoading && inputAuthor.length > 0 && (
                        <div className="dropdown-wrapper">
                            <ul className='ul-authors-card'>
                                {authorsAssociationSearch.length > 0 ? (
                                    authorsAssociationSearch.map((author, index) => 
                                        author.name.length > 0 ? (
                                            <li 
                                                key={index}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={() => {
                                                    handleAuthorOptionClick(author);
                                                }}
                                                className="subtopic-option"
                                            >
                                                {author.name}
                                            </li>
                                        ) : null
                                    )
                                ) : (
                                    !authorsSearchLoading && (
                                        <li 
                                            className="add-new-subtopic"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                handleAddNewAuthor();
                                            }}
                                        >
                                            Add "{inputAuthor}"
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
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
                    <p className='p-quote-card-description'><strong>Link:</strong></p> 
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