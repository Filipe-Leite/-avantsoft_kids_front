import { useDispatch, useSelector } from 'react-redux';
import './letterIndexSearch.css';
import { AppDispatch, RootState, store } from '../../../store';
import { useEffect, useRef, useState } from 'react';
import { Level } from '../../../#interfaces/slicesInterfaces';
import { CircularProgress } from "@mui/material";
import { getDisciplines, getSearch } from '../../../../features/sessionBusiness/sessionNavigation';

export default function LetterIndexSearch(){
    const dispatch = useDispatch<AppDispatch>();
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const disciplines = useSelector((state: RootState) => state.sessionNavigation.disciplines);
    const disciplinesSearch = useSelector((state: RootState) => state.sessionNavigation.disciplinesSearch);
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const loadingDisciplines = useSelector((state: RootState) => state.sessionNavigation.loadingDisciplines);
    const [inputDisciplineSearch, setInputDisciplineSearch] = useState('');
    const [inputTopicSearch, setInputTopicSearch] = useState('');
    const [inputSubtopicSearch, setInputSubtopicSearch] = useState('');
    const [inputAuthorSearch, setInputAuthorSearch] = useState('');
    const [inputSourceSearch, setInputSourceSearch] = useState('');
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
    const [disciplineSearchPage, setDisciplineSearchPage] = useState(1);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )

    useEffect(() => {
        console.log('FirstLevel atual:', levels);
        console.log('Estado completo:', store.getState());
    }, [levels]);

    useEffect(() => {
        async function fetchDisciplines(){
            await dispatch(getDisciplines({authHeaders: authHeaders, 
                                           page: disciplinePage, 
                                           letter: letterchoice}))
        }

        async function fetchDisciplinesSearch(){
            await dispatch(getSearch({authHeaders: authHeaders,
                                                             queryType: 'discipline',
                                                             page: disciplinePage,
                                                             searchTerm: inputDisciplineSearch.trim(),
                                                             letter: letterchoice}))
        }

        (inputDisciplineSearch.length == 0 ?

            fetchDisciplines()
            :
            fetchDisciplinesSearch()
        )

    }, [disciplinePage, disciplineSearchPage]);

    useEffect(() => {
        
        const timeoutId = setTimeout(() => {

            if (activeInput === 'discipline' && authHeaders){

                if (inputDisciplineSearch.trim() !== '') {
                        dispatch(getSearch({authHeaders: authHeaders,
                                                         queryType: 'discipline',
                                                         page: disciplinePage,
                                                         searchTerm: inputDisciplineSearch.trim(),
                                                         letter: letterchoice}))

                    setInputDisciplineSearch(inputDisciplineSearch);
                } else {
                    setSearchDisciplineResults([]);
                }
            } else if (activeInput === 'topic') {
                if (inputTopicSearch.trim() !== '') {
                    setInputTopicSearch(inputTopicSearch);
                } else {
                    setSearchTopicResults([]);
                }
            } else if (activeInput === 'subtopic') {
                if (inputSubtopicSearch.trim() !== '') {
                    setInputSubtopicSearch(inputSubtopicSearch);
                } else {
                    setSearchSubtopicResults([]);
                }
            } else if (activeInput === 'author') {
                if (inputAuthorSearch.trim() !== '') {
                    setInputAuthorSearch(inputAuthorSearch);
                } else {
                    setSearchAuthorResults([]);
                }
            } else if (activeInput === 'source') {
                if (inputSourceSearch.trim() !== '') {
                    setInputSourceSearch(inputSourceSearch);
                } else {
                    setSearchSourceResults([]);
                }
            }
        }, 300);

        return () => clearTimeout(timeoutId);

    }, [inputDisciplineSearch, inputTopicSearch, inputSubtopicSearch, inputAuthorSearch, inputSourceSearch]);

    const firstChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 1);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }

    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('container-ul-section');
            if (!container) return;
    
            const { scrollTop, clientHeight, scrollHeight } = container;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingDisciplines) {
                (inputDisciplineSearch.length === 0 ? 
                    setDisciplinePage(disciplinePage + 1)
                 :
                    setDisciplineSearchPage(disciplineSearchPage + 1)
            );
            }
        };
    
        setTimeout(() => {
            const container = document.getElementById('container-ul-section');
            if (container){
                container.addEventListener('scroll', handleScroll);
                return () => container.removeEventListener('scroll', handleScroll);
            }
        }, 100);
    }, [loadingDisciplines]);

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
                                    value={inputDisciplineSearch}
                                    ref={inputDisciplineRef}
                                    onChange={(e) => setInputDisciplineSearch(e.target.value)}
                                    onFocus={() => setActiveInput('discipline')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul id='ul-disciplines'>
                                {inputDisciplineSearch.length === 0 ? disciplines.length > 0 && disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
                                    </li>
                                )) : disciplinesSearch && disciplinesSearch.length > 0 && disciplinesSearch.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
                                    </li>)) 
                                }
                            
                                {loadingDisciplines ? 
                                    <div>
                                        <CircularProgress color='secondary' sx={{ color: 'rgba(50,50,50)' }}/>
                                    </div>
                                    :
                                    null
                                }
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
                                    value={inputTopicSearch}
                                    ref={inputTopicRef}
                                    onChange={(e) => setInputTopicSearch(e.target.value)}
                                    onFocus={() => setActiveInput('topic')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.length > 0 && disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
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
                                    value={inputDisciplineSearch}
                                    ref={inputSubtopicTopicRef}
                                    onChange={(e) => setInputTopicSearch(e.target.value)}
                                    onFocus={() => setActiveInput('subtopic')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.length > 0 && disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
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
                                    value={inputAuthorSearch}
                                    ref={inputAuthorRef}
                                    onChange={(e) => setInputAuthorSearch(e.target.value)}
                                    onFocus={() => setActiveInput('author')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.length > 0 && disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
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
                                    value={inputSourceSearch}
                                    ref={inputSourceRef}
                                    onChange={(e) => setInputSourceSearch(e.target.value)}
                                    onFocus={() => setActiveInput('source')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section'>
                            <ul>
                                {disciplines.length > 0 && disciplines.map((discipline, index) => (
                                    <li key={index}>
                                        <a>{discipline.name}</a>
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