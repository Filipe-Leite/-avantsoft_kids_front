import './home.css';

export default function Home() {
    const letters = ["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Z"];

    return (
        <div id='page-letters-index'>
            <div className="letters-container">
                {letters.map((letter, index) => (
                    <button key={index} className="letter">
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
}