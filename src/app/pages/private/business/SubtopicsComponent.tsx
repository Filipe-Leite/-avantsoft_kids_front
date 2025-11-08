import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getSubtopics, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';

interface SubtopicsComponentProps {
  discipline?: number;
}
export default function SubtopicsComponent({discipline}: SubtopicsComponentProps){
    const [inputSubtopicSearch, setInputSubtopicSearch] = useState('');
    const inputSubtopicRef = useRef<HTMLInputElement | null>(null);
    const subtopicsSearch = useSelector((state: RootState) => state.sessionNavigation.subtopicsSearch);
    const subtopics = useSelector((state: RootState) => state.sessionNavigation.subtopics);
    const loadingSubtopics = useSelector((state: RootState) => state.sessionNavigation.loadingSubtopics);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [subtopicPage, setSubtopicPage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [subtopicSearchPage, setSubtopicSearchPage] = useState(1);
    const disciplineChoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 2 && obj.key === 'discipline')?.id : undefined )

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            async function fetchData() {
                if (inputSubtopicSearch.length === 0) {
                    await dispatch(getSubtopics({
                        authHeaders: authHeaders, 
                        page: subtopicPage, 
                        letter: letterchoice,
                        discipline: disciplineChoice
                    }));
                } else {
                    await dispatch(getSearch({
                        authHeaders: authHeaders,
                        queryType: 'subtopic',
                        page: subtopicSearchPage,
                        searchTerm: inputSubtopicSearch.trim(),
                        letter: letterchoice
                    }));
                }
            }
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputSubtopicSearch, subtopicPage, subtopicSearchPage]);

    useEffect((): (() => void) => {
        const handleSubtopicScroll = (): void => {
            const container = document.getElementById('container-ul-section-subtopic');
            if (!container) return;

            const { scrollTop, clientHeight, scrollHeight } = container;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingSubtopics) {
                inputSubtopicSearch.length === 0 
                    ? setSubtopicPage(prev => prev + 1)
                    : setSubtopicSearchPage(prev => prev + 1);
            }
        };

        const timer = setTimeout((): void => {
            const subtopicContainer = document.getElementById('container-ul-section-subtopic');

            if (subtopicContainer) {
                subtopicContainer.addEventListener('scroll', handleSubtopicScroll);
            }
        }, 100);

        return (): void => {
            clearTimeout(timer);
            const subtopicContainer = document.getElementById('container-ul-section-subtopic');
            
            if (subtopicContainer) {
                subtopicContainer.removeEventListener('scroll', handleSubtopicScroll);
            }
        };
    }, [
        loadingSubtopics, 
        inputSubtopicSearch.length
    ]);

    return(
        <div className='container-title-section'>
            <div className='container-title'>
                <h2>Subtopic</h2>

                <div className='container-search-field'>
                    <input 
                        className='search-subtopic-input'
                        type="text"
                        placeholder="Search..."
                        value={inputSubtopicSearch}
                        ref={inputSubtopicRef}
                        onChange={(e) => setInputSubtopicSearch(e.target.value)}
                    />
                </div>
            </div>
            <div id='container-ul-section-subtopic'>
                <ul className='ul-subtopics'>
                    {inputSubtopicSearch.length === 0 && subtopics ? subtopics.length > 0 && subtopics.map((subtopic, index) => (
                        <li key={index}>
                            <a>{subtopic.name}</a>
                        </li>
                    )) : subtopicsSearch && subtopicsSearch.length > 0 && subtopicsSearch.map((subtopic, index) => (
                        <li key={index}>
                            <a>{subtopic.name}</a>
                        </li>)) 
                    }
                
                    {loadingSubtopics ? 
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