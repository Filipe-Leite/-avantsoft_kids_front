import { useSelector } from 'react-redux';
import './thirdLevelIndexSearch.css';
import { RootState } from '../../../store';
import { Level } from '../../../#interfaces/slicesInterfaces';
import { useEffect } from 'react';

export default function ThirdLevelIndexSearch(){
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);

    useEffect(()=>{

        console.log("levels >> ", levels)
    }
        
        ,[])

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