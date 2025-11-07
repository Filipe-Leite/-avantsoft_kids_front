import { useDispatch, useSelector } from 'react-redux';
import './thirdLevelIndexSearch.css';
import { AppDispatch, RootState } from '../../../store';
import { Level } from '../../../#interfaces/slicesInterfaces';
import { useEffect, useState } from 'react';
import { getSearch, getTopics } from '../../../../features/sessionBusiness/sessionNavigation';

export default function ThirdLevelIndexSearch(){
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const dispatch = useDispatch<AppDispatch>();
    const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
    const topics = useSelector((state: RootState) => state.sessionNavigation.topics);
    const [inputTopicSearch, setInputTopicSearch] = useState('');
    const [topicPage, setTopicPage] = useState(1);
    const letterchoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 1 && obj.key === 'letter')?.choice : undefined )
    const [topicSearchPage, setTopicSearchPage] = useState(1);
    const disciplineChoice = ( levels && levels.length > 0 ? levels.find(obj => obj.position === 2 && obj.key === 'discipline')?.id : undefined )
    
    useEffect(() => {
        async function fetchTopics(){
                    await dispatch(getTopics({authHeaders: authHeaders, 
                                                    page: topicPage, 
                                                    letter: undefined,
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

    },[topicPage, topicSearchPage, inputTopicSearch])

    const firstChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 1);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }

    const secondChoice = () => {
        const positionOne = levels?.find((item: Level) => item.position === 2);
        
        return positionOne ? {
            key: positionOne.key,
            choice: positionOne.choice
        } : null;
        
    }
    return (
            <div id='page-third-level-index'>
                <div className='top-page'>
                <div className='container-index'>
                    {firstChoice()?.key && firstChoice()?.choice && (
                    <div className='container-choice-index'> 
                        <h1>{firstChoice()?.key}</h1>
                        <h2>{firstChoice()?.choice}</h2>
                    </div>
                    )}
                    <div className='container-sign'>
                    <h1>{' >'}</h1>
                    </div>
                </div>
                <div className='container-index'>
                    {secondChoice()?.key && secondChoice()?.choice && (
                    <div className='container-choice-index'> 
                        <h1>{secondChoice()?.key}</h1>
                        <h2>{secondChoice()?.choice}</h2>
                    </div>
                    )}
                    <div className='container-sign'>
                    <h1>{' >'}</h1>
                    </div>
                </div>
                </div>
            </div>
    );
}