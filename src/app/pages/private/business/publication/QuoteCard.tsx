import { Author, Location, Publisher, Source } from '../../../../#interfaces/slicesInterfaces';
import './quoteCard.css';

interface QuoteCardsProps {
  subject: string;
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
}

export default function QuoteCards({
  subject,
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
  location
}: QuoteCardsProps) {


    return(
        <li>
            <div id='container-quote-card-first-line'>
                <h3>{subject}</h3>
            </div>
            <div id='container-quote-card-second-line'>
                <div id='container-quote-card-second-line-left'>
                    <p><strong>Quote:</strong></p> 
                    <p>{quote}</p>
                </div>
                <div id='container-quote-card-second-line-right'>
                    <p><strong>Comment:</strong></p> 
                    <p>{comment}</p>
                </div>
            </div>
            <div id='container-quote-card-third-line'>
                <div id='container-quote-card-third-line-left'>
                    <p><strong>Author:</strong></p>
                    <p>{authors.length !== 0 ? (
                            authors.map((author, index) => (
                            author.reference))) : null}
                    </p>
                </div>
                <div id='container-quote-card-third-line-right'>
                    <p><strong>Source:</strong></p> 
                    <p>{source.title}</p>
                </div>
            </div>
            <div id='container-quote-card-forth-line'>
                <div id='container-quote-card-forth-line-left-left'>
                    <p><strong>Edition:</strong></p>
                    <p>{edition}</p>
                </div>
                <div id='container-quote-card-forth-line-right-left'>
                    <p><strong>City:</strong></p> 
                    <p>{city}</p>
                </div>

                <div id='container-quote-card-forth-line-right-right'>
                    <p><strong>Publisher:</strong></p>
                    <p>{publisher.name}</p>
                </div>
                <div id='container-quote-card-forth-line-right-right'>
                    <p><strong>Year:</strong></p> 
                    <p>{year.toLocaleDateString()}</p>
                </div>
            </div>
            <div id='container-quote-card-five-line'>
                <div id='container-quote-card-five-line-left'>
                    <p><strong>Access Date:</strong></p>
                    <p>{<p>Internet Access Date: {internetAccessDate.toLocaleDateString()}</p>}
                    </p>
                </div>
                <div id='container-quote-card-five-line-right'>
                    <p><strong>Source:</strong></p> 
                    <p>{source.title}</p>
                </div>
            </div>
            <div id='container-quote-card-six-line'>
                <p><strong>Location:</strong></p>
                <p>{location.name}</p>
            </div>
            
        </li>
    )
}