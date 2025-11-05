import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getSources, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';

export default function SourcesComponent(){
    const [inputSourceSearch, setInputSourceSearch] = useState('');
    const inputSourceRef = useRef<HTMLInputElement | null>(null);
    const sourcesSearch = useSelector((state: RootState) => state.sessionNavigation.sourcesSearch);
    const sources = useSelector((state: RootState) => state.sessionNavigation.sources);
    const loadingSources = useSelector((state: RootState) => state.sessionNavigation.loadingSources);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [sourcePage, setSourcePage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [sourceSearchPage, setSourceSearchPage] = useState(1);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            async function fetchData() {
                if (inputSourceSearch.length === 0) {
                    await dispatch(getSources({
                        authHeaders: authHeaders, 
                        page: sourcePage, 
                        letter: letterchoice
                    }));
                } else {
                    await dispatch(getSearch({
                        authHeaders: authHeaders,
                        queryType: 'source',
                        page: sourceSearchPage,
                        searchTerm: inputSourceSearch.trim(),
                        letter: letterchoice
                    }));
                }
            }
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputSourceSearch, sourcePage, sourceSearchPage]);

    useEffect((): (() => void) => {
        const handleSourceScroll = (): void => {
            const container = document.getElementById('container-ul-section-source');
            if (!container) return;

            const { scrollTop, clientHeight, scrollHeight } = container;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingSources) {
                inputSourceSearch.length === 0 
                    ? setSourcePage(prev => prev + 1)
                    : setSourceSearchPage(prev => prev + 1);
            }
        };

        const timer = setTimeout((): void => {
            const sourceContainer = document.getElementById('container-ul-section-source');

            if (sourceContainer) {
                sourceContainer.addEventListener('scroll', handleSourceScroll);
            }
        }, 100);

        return (): void => {
            clearTimeout(timer);
            const sourceContainer = document.getElementById('container-ul-section-source');
            
            if (sourceContainer) {
                sourceContainer.removeEventListener('scroll', handleSourceScroll);
            }
        };
    }, [
        loadingSources, 
        inputSourceSearch.length
    ]);

    return(
        <div className='container-title-section'>
            <div className='container-title'>
                <h2>Source</h2>

                <div className='container-search-field'>
                    <input 
                        className='search-source-input'
                        type="text"
                        placeholder="Search..."
                        value={inputSourceSearch}
                        ref={inputSourceRef}
                        onChange={(e) => setInputSourceSearch(e.target.value)}
                    />
                </div>
            </div>
            <div id='container-ul-section-source'>
                <ul className='ul-sources'>
                    {inputSourceSearch.length === 0 && sources ? sources.length > 0 && sources.map((source, index) => (
                        <li key={index}>
                            <a>{source.title}</a>
                        </li>
                    )) : sourcesSearch && sourcesSearch.length > 0 && sourcesSearch.map((source, index) => (
                        <li key={index}>
                            <a>{source.title}</a>
                        </li>)) 
                    }
                
                    {loadingSources ? 
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