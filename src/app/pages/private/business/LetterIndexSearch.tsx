import { useDispatch, useSelector } from 'react-redux';
import './letterIndexSearch.css';
import { AppDispatch, RootState, store } from '../../../store';
import { useEffect, useRef, useState } from 'react';
import { Level, NavigationState } from '../../../#interfaces/slicesInterfaces';
import addIcon from '../../../../assets/add-icon-black.png';
import { handlePrivateRoutes } from '../../../api/requestRequirements';
import { getSearch } from '../../../../features/sessionBusiness/sessionNavigation';

export default function LetterIndexSearch(){
    const dispatch = useDispatch<AppDispatch>();
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const disciplines = ["Administration",
                            "Aeronautics", 
                            "Agronomy / Agriculture",
                            "Anthropology",
                            "Archaeology",
                            "Architecture",
                            "Arts",
                            "Astronomy",
                            "Astrophysics",
                            "Audiovisual Studies",
                            "Archaeology",
                            "Architecture",
                            "Arts",
                            "Astronomy",
                            "Astrophysics",
                            "Audiovisual Studies",
                            "Archaeology",
                            "Architecture",
                            "Arts",
                            "Astronomy",
                            "Astrophysics",
                            "Audiovisual Studies"];
    const [disciplineSearch, setDisciplineSearch] = useState('');
    const [topicSearch, setTopicSearch] = useState('');
    const [subtopicSearch, setSubtopicSearch] = useState('');
    const [authorSearch, setAuthorSearch] = useState('');
    const [sourceSearch, setSourceSearch] = useState('');
    const [searchDisciplineResults, setSearchDisciplineResults] = useState([]);
    const [searchTopicResults, setSearchTopicResults] = useState([]);
    const [searchSubtopicResults, setSearchSubtopicResults] = useState([]);
    const [searchAuthorResults, setSearchAuthorResults] = useState([]);
    const [searchSourceResults, setSearchSourceResults] = useState([]);
    const inputDisciplineRef = useRef<HTMLInputElement | null>(null);
    const inputTopicRef = useRef<HTMLInputElement | null>(null);
    const inputSubtopicTopicRef = useRef<HTMLInputElement | null>(null);
    const inputAuthorRef = useRef<HTMLInputElement | null>(null);
    const inputSourceRef = useRef<HTMLInputElement | null>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [disciplinePage, setDisciplinePage] = useState(1);

    useEffect(() => {
        console.log('FirstLevel atual:', levels);
        console.log('Estado completo:', store.getState());
    }, [levels]);

    useEffect(() => {

        console.log("activeInput >>>> ", activeInput)
        console.log("inputDisciplineRef >>>> ", inputDisciplineRef)
        console.log("inputTopicRef >>>> ", inputTopicRef)
        console.log("inputSubtopicTopicRef >>>> ", inputSubtopicTopicRef)
        console.log("inputAuthorRef >>>> ", inputAuthorRef)
        console.log("inputSourceRef >>>> ", inputSourceRef)
        
        const timeoutId = setTimeout(() => {

            if (activeInput === 'discipline' && authHeaders){
                if (disciplineSearch.trim() !== '') {
                    const PRIVATE_ROUTES = handlePrivateRoutes({ROUTE_PARAMS: 
                                                                            {queryType: 'discipline',
                                                                             page: disciplinePage  
                                                                            }})
                                                                    
                    const response = dispatch(getSearch({authHeaders: authHeaders,
                                                         queryType: 'discipline',
                                                         page: disciplinePage,
                                                         searchTerm: disciplineSearch}))

                    setDisciplineSearch(disciplineSearch);
                } else {
                    setSearchDisciplineResults([]);
                }
            } else if (activeInput === 'topic') {
                if (topicSearch.trim() !== '') {
                    setTopicSearch(topicSearch);
                } else {
                    setSearchTopicResults([]);
                }
            } else if (activeInput === 'subtopic') {
                if (subtopicSearch.trim() !== '') {
                    setSubtopicSearch(subtopicSearch);
                } else {
                    setSearchSubtopicResults([]);
                }
            } else if (activeInput === 'author') {
                if (authorSearch.trim() !== '') {
                    setAuthorSearch(authorSearch);
                } else {
                    setSearchAuthorResults([]);
                }
            } else if (activeInput === 'source') {
                if (sourceSearch.trim() !== '') {
                    setSourceSearch(sourceSearch);
                } else {
                    setSearchSourceResults([]);
                }
            }
        }, 300);

        return () => clearTimeout(timeoutId);

    }, [disciplineSearch, topicSearch, subtopicSearch, authorSearch, sourceSearch]);

    const performSearch = async (searchTerm: string) => {
        try {
            const results = await console.log(searchTerm);
            // setSearchDisciplineResults(results);
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    };

    const firstChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 1);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }

    return(
        <div id='page-letter-index'>
            <div id='top-page'>
                <div id='container-index'>
                    { firstChoice()?.key && firstChoice()?.choice ? 
                        <div id='container-choice-index'> 
                            <h1>{firstChoice()?.key}</h1>
                            <h2>{firstChoice()?.choice}</h2>
                        </div>
                    :
                    null 
                    }
                    <div id='container-sign'>
                        <h1>
                        {' ' + '>'}
                        </h1>
                    </div>
                </div>
            </div>
            <div id='container-sections'>
                <div id='section-index'>
                    <div id='container-title-section'>
                        <div id='container-title'>
                            <h2>Discipline</h2>

                            <div id='container-search-field-add-button'>
                                <input 
                                    id='search-discipline-input'
                                    type="text"
                                    placeholder="Search..."
                                    value={disciplineSearch}
                                    ref={inputDisciplineRef}
                                    onChange={(e) => setDisciplineSearch(e.target.value)}
                                    onFocus={() => setActiveInput('discipline')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                {/* <button>
                                    <img src={addIcon}/>
                                </button> */}
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline}</a>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='section-index'>
                    <div id='container-title-section'>
                        <div id='container-title'>
                            <h2>Topic</h2>

                            <div id='container-search-field-add-button'>
                                <input 
                                    id='search-topic-input'
                                    type="text"
                                    placeholder="Search..."
                                    value={topicSearch}
                                    ref={inputTopicRef}
                                    onChange={(e) => setTopicSearch(e.target.value)}
                                    onFocus={() => setActiveInput('topic')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                {/* <button>
                                    <img src={addIcon}/>
                                </button> */}
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline}</a>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='section-index'>
                    <div id='container-title-section'>
                        <div id='container-title'>
                            <h2>Subtopic</h2>

                            <div id='container-search-field-add-button'>
                                <input 
                                    id='search-subtopic-input'
                                    type="text"
                                    placeholder="Search..."
                                    value={disciplineSearch}
                                    ref={inputSubtopicTopicRef}
                                    onChange={(e) => setTopicSearch(e.target.value)}
                                    onFocus={() => setActiveInput('subtopic')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                {/* <button>
                                    <img src={addIcon}/>
                                </button> */}
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline}</a>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div id='container-sections'>
                <div id='section-index'>
                    <div id='container-title-section'>
                        <div id='container-title'>
                            <h2>Author</h2>

                            <div id='container-search-field-add-button'>
                                <input 
                                    id='search-author-input'
                                    type="text"
                                    placeholder="Search..."
                                    value={authorSearch}
                                    ref={inputAuthorRef}
                                    onChange={(e) => setAuthorSearch(e.target.value)}
                                    onFocus={() => setActiveInput('author')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                {/* <button>
                                    <img src={addIcon}/>
                                </button> */}
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline}</a>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id='section-index'>
                    <div id='container-title-section'>
                        <div id='container-title'>
                            <h2>Source</h2>
                            <div id='container-search-field-add-button'>
                                <input 
                                    id='search-source-input'
                                    type="text"
                                    placeholder="Search..."
                                    value={sourceSearch}
                                    ref={inputSourceRef}
                                    onChange={(e) => setSourceSearch(e.target.value)}
                                    onFocus={() => setActiveInput('source')}
                                    onBlur={() => setActiveInput(null)}
                                />
                                {/* <button>
                                    <img src={addIcon}/>
                                </button> */}
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline}</a>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}