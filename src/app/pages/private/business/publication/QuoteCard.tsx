import { Author, Location, Publisher, Source, Subtopic } from '../../../../#interfaces/slicesInterfaces';
import './quoteCard.css';
import logoBorderBlack from '../../../../../assets/apice_logo_white_backgroud_transparent_border_black.png'
import closeIcon from '../../../../../assets/close-icon-white-24.png';
import eraseIcon from '../../../../../assets/erase-icon-white-50.png';

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

    return(
        <li id='li-quote-card'>

            <button className='button-close-new-quote-card'>
                <img alt='close-icon' src={closeIcon}/>
            </button>

            <button className='button-erase-new-quote-card'>
                <img alt='erase-icon' src={eraseIcon}/>
            </button>

            <div id='container-quote-card-first-line'>
                {addCardClicked
                
                ?

                <h3>{subtopic?.name}</h3>
                
                :

                <input
                    className='input-sutopic-quote-card'
                    type="text"
                    placeholder="Subtopic"
                    value={inputSutopicQuoteCard}
                    onChange={(e) => setInputSutopicQuoteCard(e.target.value)}
                />}
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