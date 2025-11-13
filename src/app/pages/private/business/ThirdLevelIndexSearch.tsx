import { useSelector } from 'react-redux';
import './thirdLevelIndexSearch.css';
import { RootState } from '../../../store';
import { Level } from '../../../#interfaces/slicesInterfaces';
import { useState } from 'react';
import TopicsComponent from './TopicsComponent';
import SubtopicsComponent from './SubtopicsComponent';
import AuthorsComponent from './AuthorsComponent';
import SourcesComponent from './SourcesComponent';
import digIcon from '../../../../assets/dig-icon-white-32.png'
import publhishIcon from '../../../../assets/publish-icon-white-32.png'
import CurrentCardsComponent from './publication/CurrentCardsComponent';

export default function ThirdLevelIndexSearch(){
    const levels = useSelector((state: RootState) => state.sessionNavigation.levels);
    const [digButtonClicked, setDigButtonClicked] = useState(false);
    const [publishButtonClicked, setPublishButtonClicked] = useState(true);

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
                        {secondChoice()?.key && secondChoice()?.choice && (
                            <div className='container-choice-index'> 
                                <h1>{secondChoice()?.key}</h1>
                                <h2>{secondChoice()?.choice}</h2>
                            </div>
                        )}
                    </div>
                </div>
                <button className='publish-button' onClick={() => setPublishButtonClicked(!publishButtonClicked)}>
                    <img alt='dig-icon' src={publhishIcon}/>
                    Publish
                </button>

                {   publishButtonClicked ?

                    <CurrentCardsComponent/>

                    :

                    null
                }
                
                <button className='dig-button' onClick={() => setDigButtonClicked(!digButtonClicked)}>
                    <img alt='dig-icon' src={digIcon}/>
                    Dig
                </button>

                {
                    digButtonClicked ?

                <div id='container-sections-lines'>
                    <div id='container-sections'>
                        <div id='section-index'>
                            <TopicsComponent/>
                        </div>
                        <div id='section-index'>
                            <SubtopicsComponent/>
                        </div>
                        <div id='section-index'>
                            <AuthorsComponent/>
                        </div>
                    </div>
                    <div id='container-sections'>
                    
                        <div id='section-index'>
                            <SourcesComponent/>
                        </div>
                    </div>
                </div>

                :

                null

                }
            </div>
    );
}