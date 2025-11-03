import { useDispatch, useSelector } from 'react-redux';
import './letterIndexSearch.css';
import { AppDispatch, RootState, store } from '../../../store';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Level } from '../../../#interfaces/slicesInterfaces';
import { CircularProgress } from "@mui/material";
import { getDisciplines, getSearch, getTopics } from '../../../../features/sessionBusiness/sessionNavigation';
import DisciplinesComponent from './DisciplinesComponent';
import TopicsComponent from './TopicsComponent';

export default function LetterIndexSearch(){
    const dispatch = useDispatch<AppDispatch>();
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const disciplines = useSelector((state: RootState) => state.sessionNavigation.disciplines);
    const disciplinesSearch = useSelector((state: RootState) => state.sessionNavigation.disciplinesSearch);
    const topics = useSelector((state: RootState) => state.sessionNavigation.topics);
    const topicsSearch = useSelector((state: RootState) => state.sessionNavigation.topicsSearch);
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const loadingTopics = useSelector((state: RootState) => state.sessionNavigation.loadingTopics);
    const [inputTopicSearch, setInputTopicSearch] = useState('');
    const [inputSubtopicSearch, setInputSubtopicSearch] = useState('');
    const [inputAuthorSearch, setInputAuthorSearch] = useState('');
    const [inputSourceSearch, setInputSourceSearch] = useState('');
    const [searchDisciplineResults, setSearchDisciplineResults] = useState([]);
    const [searchTopicResults, setSearchTopicResults] = useState([]);
    const [searchSubtopicResults, setSearchSubtopicResults] = useState([]);
    const [searchAuthorResults, setSearchAuthorResults] = useState([]);
    const [searchSourceResults, setSearchSourceResults] = useState([]);
    const inputTopicRef = useRef<HTMLInputElement | null>(null);
    const inputSubtopicTopicRef = useRef<HTMLInputElement | null>(null);
    const inputAuthorRef = useRef<HTMLInputElement | null>(null);
    const inputSourceRef = useRef<HTMLInputElement | null>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [disciplinePage, setDisciplinePage] = useState(1);
    const [topicPage, setTopicPage] = useState(1);
    const [topicSearchPage, setTopicSearchPage] = useState(1);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )

    useEffect(() => {
        console.log('FirstLevel atual:', levels);
        console.log('Estado completo:', store.getState());
    }, [levels]);


    const firstChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 1);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }

    useEffect(() => {
        
        const timeoutId = setTimeout(() => {

            if (activeInput === 'topic') {
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

    }, [inputTopicSearch, inputSubtopicSearch, inputAuthorSearch, inputSourceSearch]);



useEffect((): (() => void) => {

  const handleTopicScroll = (): void => {
    const container = document.getElementById('container-ul-section-topic');
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingTopics) {
      inputTopicSearch.length === 0 
        ? setTopicPage(prev => prev + 1)
        : setTopicSearchPage(prev => prev + 1);
    }
  };

  const timer = setTimeout((): void => {
    const topicContainer = document.getElementById('container-ul-section-topic');

    if (topicContainer) {
      topicContainer.addEventListener('scroll', handleTopicScroll);
    }
  }, 100);

  return (): void => {
    clearTimeout(timer);
    const disciplineContainer = document.getElementById('container-ul-section-discipline');
    const topicContainer = document.getElementById('container-ul-section-topic');
    
    if (topicContainer) {
      topicContainer.removeEventListener('scroll', handleTopicScroll);
    }
  };
}, [
  loadingTopics, 
  inputTopicSearch.length
]);

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
                    <DisciplinesComponent/>
                </div>
                <div id='section-index'>
                    <TopicsComponent/>
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
                                    value={inputSubtopicSearch}
                                    ref={inputSubtopicTopicRef}
                                    onChange={(e) => setInputTopicSearch(e.target.value)}
                                    onFocus={() => setActiveInput('subtopic')}
                                    onBlur={() => setActiveInput(null)}
                                />
                            </div>
                        </div>
                        <div id='container-ul-section-subtopic'>
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
                        <div id='container-ul-section-author'>
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
                        <div id='container-ul-section-source'>
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