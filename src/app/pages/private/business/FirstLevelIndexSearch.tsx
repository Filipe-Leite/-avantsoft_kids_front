import { useNavigate } from 'react-router-dom';
import './firstLevelIndexSearch.css';
import { handlePrivateRoutes } from '../../../api/requestRequirements';
import { setLevelSearch } from '../../../../features/sessionBusiness/sessionNavigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

export default function FirstLevelIndexSearch() {
    const letters = ["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Z"];
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div id='page-letters-index'>
            <div className="letters-container">
                {letters.map((letter, index) => (
                    <button key={index}
                            className="letter"
                            onClick={() => {dispatch(setLevelSearch({ 
                                                                     position: 1,
                                                                     key: 'letter',
                                                                     choice: letter 
                                                                            }));
                                           navigate(handlePrivateRoutes({ROUTE_PARAMS: 
                                                                            {letter: letter}
                                                                        }).SECOND_LEVEL)}}>

                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
}