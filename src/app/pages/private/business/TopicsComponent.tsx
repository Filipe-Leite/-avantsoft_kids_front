import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getTopics, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';

interface TopicsComponentProps {
  discipline?: number;
}

export default function TopicsComponent({discipline}: TopicsComponentProps){
    const [inputTopicSearch, setInputTopicSearch] = useState('');
    const inputTopicRef = useRef<HTMLInputElement | null>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const topicsSearch = useSelector((state: RootState) => state.sessionNavigation.topicsSearch);
    const topics = useSelector((state: RootState) => state.sessionNavigation.topics);
    const loadingTopics = useSelector((state: RootState) => state.sessionNavigation.loadingTopics);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [topicPage, setTopicPage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [topicSearchPage, setTopicSearchPage] = useState(1);
    const disciplineChoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 2 && obj.key === 'discipline')?.id : undefined )


    useEffect(() => {

        async function fetchTopics(){
                    await dispatch(getTopics({authHeaders: authHeaders, 
                                              page: topicPage, 
                                              letter: letterchoice,
                                              discipline: disciplineChoice}))
                }
                
        async function fetchTopicsSearch(){
            await dispatch(getSearch({authHeaders: authHeaders,
                                                                queryType: 'topic',
                                                                page: topicPage,
                                                                searchTerm: inputTopicSearch.trim(),
                                                                letter: letterchoice}))
        
    
                                                            }
        if (inputTopicSearch.length === 0){

                fetchTopics()

            } else {

                fetchTopicsSearch()
            
            }

    },[topicPage, topicSearchPage,inputTopicSearch])

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
        <div className='container-title-section'>
            <div className='container-title'>
                <h2>Topic</h2>

                <div className='container-search-field'>
                    <input 
                        className='search-topic-input'
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
            <div id='container-ul-section-topic'>
                <ul className='ul-topics'>
                    {inputTopicSearch.length === 0 && topics ? topics.length > 0 && topics.map((topic, index) => (
                        <li key={index}>
                            <a>{topic.name}</a>
                        </li>
                    )) : topicsSearch && topicsSearch.length > 0 && topicsSearch.map((topic, index) => (
                        <li key={index}>
                            <a>{topic.name}</a>
                        </li>)) 
                    }
                
                    {loadingTopics ? 
                        <div>
                            <CircularProgress color='secondary' sx={{ color: 'rgba(50,50,50)' }}/>
                        </div>
                        :
                        null
                    }
                </ul>
            </div>
        </div>
    )
}