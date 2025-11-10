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
  resourceId: number;
  authorId: number;
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
  resourceId,
  authorId
}: QuoteCardsProps) {
    return(
        <li>
            <div id='container-quote-card-first-line'>
                <h3>{subject}</h3>
            </div>
            <div id='container-quote-card-second-line'>
                <div id='container-quote-card-second-line-left'>
                    <p>Quote: {quote}</p>
                </div>
                <div id='container-quote-card-second-line-right'>
                    <p>Comment: {comment}</p>
                </div>
            </div>
            <p>Card Type: {cardType}</p>
            <p>Edition: {edition}</p>
            <p>City: {city}</p>
            <p>Year: {year.toLocaleDateString()}</p>
            <p>Internet Access Date: {internetAccessDate.toLocaleDateString()}</p>
            <a href={internetAccessLink} target="_blank" rel="noopener noreferrer">
                Access Link
            </a>
            <p>User ID: {userId}</p>
            <p>Resource ID: {resourceId}</p>
            <p>Author ID: {authorId}</p>
        </li>
    )
}