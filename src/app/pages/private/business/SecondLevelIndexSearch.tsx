import { useDispatch, useSelector } from 'react-redux';
import './secondLevelIndexSearch.css';
import { RootState } from '../../../store';
import { Level } from '../../../#interfaces/slicesInterfaces';
import DisciplinesComponent from './DisciplinesComponent';
import TopicsComponent from './TopicsComponent';
import SubtopicsComponent from './SubtopicsComponent';
import AuthorsComponent from './AuthorsComponent';
import SourcesComponent from './SourcesComponent';
import { useEffect } from 'react';
import { setLevelSearch } from '../../../../features/sessionBusiness/sessionNavigation';

export default function SecondLevelIndexSearch(){
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const dispatch = useDispatch();
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )

    useEffect(()=>{
        dispatch(setLevelSearch({ 
                                                                     position: 1,
                                                                     key: 'letter',
                                                                     choice: letterchoice 
                                                                            }));
    },[])


    const firstChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 1);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }

    return(
        <div id='page-letter-index'>
            <div className='top-page'>
                <div className='container-index'>
                    { firstChoice()?.key && firstChoice()?.choice ? 
                        <div className='container-choice-index'> 
                            <h1>{firstChoice()?.key}</h1>
                            <h2>{firstChoice()?.choice}</h2>
                        </div>
                    :
                    null 
                    }
                    <div className='container-sign'>
                        <h1>
                        {' ' + '>'}
                        </h1>
                    </div>
                </div>
            </div>
            <div id='container-sections-lines'>
                <div id='container-sections'>
                    <div id='section-index'>
                        <DisciplinesComponent/>
                    </div>
                    <div id='section-index'>
                        <TopicsComponent discipline={undefined}/>
                    </div>
                    <div id='section-index'>
                        <SubtopicsComponent/>
                    </div>
                </div>

                <div id='container-sections'>
                    <div id='section-index'>
                        <AuthorsComponent/>
                    </div>
                    <div id='section-index'>
                        <SourcesComponent/>
                    </div>
                </div>
            </div>
        </div>
    )
}