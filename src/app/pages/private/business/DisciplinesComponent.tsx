import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { CircularProgress } from "@mui/material";
import { getDisciplines, getSearch } from "../../../../features/sessionBusiness/sessionNavigation";
import './categoriesListing.css';
import { handlePrivateRoutes } from '../../../api/requestRequirements';
import { setLevelSearch } from '../../../../features/sessionBusiness/sessionNavigation';
import { useNavigate, useParams } from "react-router-dom";

export default function DisciplinesComponent(){
    const [inputDisciplineSearch, setInputDisciplineSearch] = useState('');
    const inputDisciplineRef = useRef<HTMLInputElement | null>(null);
    const disciplinesSearch = useSelector((state: RootState) => state.sessionNavigation.disciplinesSearch);
    const disciplines = useSelector((state: RootState) => state.sessionNavigation.disciplines);
    const loadingDisciplines = useSelector((state: RootState) => state.sessionNavigation.loadingDisciplines);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const [disciplinePage, setDisciplinePage] = useState(1);
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [disciplineSearchPage, setDisciplineSearchPage] = useState(1);
    const navigate = useNavigate();
    const { letter } = useParams();

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

    },[disciplinePage, disciplineSearchPage, inputDisciplineSearch])

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
        <div className='container-title-section'>
            <div className='container-title'>
                <h2>Discipline</h2>

                <div className='container-search-field'>
                    <input 
                        className='search-discipline-input'
                        type="text"
                        placeholder="Search..."
                        value={inputDisciplineSearch}
                        ref={inputDisciplineRef}
                        onChange={(e) => setInputDisciplineSearch(e.target.value)}
                    />
                </div>
            </div>
            <div id='container-ul-section-discipline'>
                <ul className='ul-disciplines'>
                    {inputDisciplineSearch.length === 0 && disciplines ? disciplines.length > 0 && disciplines.map((discipline, index) => (
                        <li key={index}
                         onClick={() => {dispatch(setLevelSearch({ 
                                                                    position: 2,
                                                                    key: 'discipline',
                                                                    choice: discipline.name,
                                                                    id: discipline.id 
                                                                            }));
                                        navigate(handlePrivateRoutes({ROUTE_PARAMS: 
                                                                            {letter: letter,
                                                                             secondLevel: discipline.name
                                                                            }
                                                                        }).THIRD_LEVEL)}}>
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