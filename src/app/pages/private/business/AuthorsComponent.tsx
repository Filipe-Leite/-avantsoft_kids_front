import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getAuthors, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';

export default function AuthorsComponent(){
    const [inputAuthorSearch, setInputAuthorSearch] = useState('');
    const inputAuthorRef = useRef<HTMLInputElement | null>(null);
    const authorsSearch = useSelector((state: RootState) => state.sessionNavigation.authorsSearch);
    const authors = useSelector((state: RootState) => state.sessionNavigation.authors);
    const loadingAuthors = useSelector((state: RootState) => state.sessionNavigation.loadingAuthors);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [authorPage, setAuthorPage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [authorSearchPage, setAuthorSearchPage] = useState(1);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            async function fetchData() {
                if (inputAuthorSearch.length === 0) {
                    await dispatch(getAuthors({
                        authHeaders: authHeaders, 
                        page: authorPage, 
                        letter: letterchoice
                    }));
                } else {
                    await dispatch(getSearch({
                        authHeaders: authHeaders,
                        queryType: 'author',
                        page: authorSearchPage,
                        searchTerm: inputAuthorSearch.trim(),
                        letter: letterchoice
                    }));
                }
            }
            fetchData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputAuthorSearch, authorPage, authorSearchPage]);

    useEffect((): (() => void) => {
        const handleAuthorScroll = (): void => {
            const container = document.getElementById('container-ul-section-author');
            if (!container) return;

            const { scrollTop, clientHeight, scrollHeight } = container;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingAuthors) {
                inputAuthorSearch.length === 0 
                    ? setAuthorPage(prev => prev + 1)
                    : setAuthorSearchPage(prev => prev + 1);
            }
        };

        const timer = setTimeout((): void => {
            const authorContainer = document.getElementById('container-ul-section-author');

            if (authorContainer) {
                authorContainer.addEventListener('scroll', handleAuthorScroll);
            }
        }, 100);

        return (): void => {
            clearTimeout(timer);
            const authorContainer = document.getElementById('container-ul-section-author');
            
            if (authorContainer) {
                authorContainer.removeEventListener('scroll', handleAuthorScroll);
            }
        };
    }, [
        loadingAuthors, 
        inputAuthorSearch.length
    ]);

    return(
        <div className='container-title-section'>
            <div className='container-title'>
                <h2>Author</h2>

                <div className='container-search-field'>
                    <input 
                        className='search-author-input'
                        type="text"
                        placeholder="Search..."
                        value={inputAuthorSearch}
                        ref={inputAuthorRef}
                        onChange={(e) => setInputAuthorSearch(e.target.value)}
                    />
                </div>
            </div>
            <div id='container-ul-section-author'>
                <ul className='ul-authors'>
                    {inputAuthorSearch.length === 0 && authors ? authors.length > 0 && authors.map((author, index) => (
                        <li key={index}>
                            <a>{author.name}</a>
                        </li>
                    )) : authorsSearch && authorsSearch.length > 0 && authorsSearch.map((author, index) => (
                        <li key={index}>
                            <a>{author.name}</a>
                        </li>)) 
                    }
                
                    {loadingAuthors ? 
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