import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getDisciplines, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';

export default function DisciplinesComponent(){
    const [inputDisciplineSearch, setInputDisciplineSearch] = useState('');
    const inputDisciplineRef = useRef<HTMLInputElement | null>(null);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const disciplinesSearch = useSelector((state: RootState) => state.sessionNavigation.disciplinesSearch);
    const disciplines = useSelector((state: RootState) => state.sessionNavigation.disciplines);
    const loadingDisciplines = useSelector((state: RootState) => state.sessionNavigation.loadingDisciplines);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [disciplinePage, setDisciplinePage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [disciplineSearchPage, setDisciplineSearchPage] = useState(1);



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
        if (inputDisciplineSearch.length === 0){

                fetchDisciplines()

            } else {

                fetchDisciplinesSearch()
            
            }

    },[disciplinePage, disciplineSearchPage])

    useEffect((): (() => void) => {
        const handleDisciplineScroll = (): void => {
            const container = document.getElementById('container-ul-section-discipline');
            if (!container) return;

            const { scrollTop, clientHeight, scrollHeight } = container;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !loadingDisciplines) {
            inputDisciplineSearch.length === 0 
                ? setDisciplinePage(prev => prev + 1)
                : setDisciplineSearchPage(prev => prev + 1);
            }
        };

        const timer = setTimeout((): void => {
            const disciplineContainer = document.getElementById('container-ul-section-discipline');

            if (disciplineContainer) {
            disciplineContainer.addEventListener('scroll', handleDisciplineScroll);
            }
        }, 100);

        return (): void => {
            clearTimeout(timer);
            const disciplineContainer = document.getElementById('container-ul-section-discipline');

            
            if (disciplineContainer) {
            disciplineContainer.removeEventListener('scroll', handleDisciplineScroll);
            }
        };
        }, [
        loadingDisciplines, 
        inputDisciplineSearch.length
        ]);

    return(
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
            <div id='container-ul-section-discipline'>
                <ul id='ul-disciplines'>
                    {inputDisciplineSearch.length === 0 && disciplines ? disciplines.length > 0 && disciplines.map((discipline, index) => (
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
    )
}