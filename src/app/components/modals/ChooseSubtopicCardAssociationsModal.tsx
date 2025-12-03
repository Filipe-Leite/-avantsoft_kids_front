import React, { useEffect, useState } from 'react';
import './chooseSubtopicCardAssociationsModal.css';
import { Discipline, Subtopic, Topic } from '../../#interfaces/slicesInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getSearch } from '../../../features/sessionBusiness/sessionNavigation';
import { deselectDiciplineAssociated, deselectTopicAssociated, selectDiciplineAssociated, selectTopicAssociated } from '../../../features/sessionBusiness/sessionCards';
import IconCloseWhite from '../../../assets/close-icon-white-24.png'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inputSubtopic: string;
  onAssociationSelect?: (associationType: string) => void;
}

const ChooseSubtopicCardAssociations: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title,
  inputSubtopic,
  onAssociationSelect
}) => {
  const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const disciplinesAssociation = useSelector((state: RootState) => state.sessionCards.disciplinesAssociationSearch);
  const topicsAssociation = useSelector((state: RootState) => state.sessionCards.topicsAssociationSearch);
  const [inputSearchDisciplineAssociated, setInputSearchDisciplineAssociated] = useState('');
  const [inputSearchTopicAssociated, setInputSearchTopicAssociated] = useState('');
  const selectedDisciplinesAssociation = useSelector((state: RootState) => state.sessionCards.selectedDisciplinesAssociation);
  const selectedTopicsAssociation = useSelector((state: RootState) => state.sessionCards.selectedTopicsAssociation);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
              
    async function fetchDisciplinesSearch(){
        await dispatch(getSearch({authHeaders: authHeaders,
                                                            queryType: 'discipline',
                                                            page: 1,
                                                            searchTerm: inputSearchDisciplineAssociated.trim(),
                                                            letter: undefined}))
    }

    fetchDisciplinesSearch()

  },[inputSearchDisciplineAssociated])

  useEffect(() => {
              
    async function fetchTopicsSearch(){
        await dispatch(getSearch({authHeaders: authHeaders,
                                                            queryType: 'topic',
                                                            page: 1,
                                                            searchTerm: inputSearchTopicAssociated.trim(),
                                                            letter: undefined}))
    }

    fetchTopicsSearch()

  },[inputSearchTopicAssociated])

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleAssociationClick = (associationType: string) => {
    if (onAssociationSelect) {
      onAssociationSelect(associationType);
    }
    onClose();
  };

  const handleDisciplineSelect = (selectedDiscipline: Discipline) => {
      setInputSearchDisciplineAssociated(selectedDiscipline.name);
  };

  const handleDisciplineOptionClick = (discipline: Discipline) => {
      handleDisciplineSelect(discipline);
  };

  const handleTopicSelect = (selectedTopic: Topic) => {
    setInputSearchTopicAssociated(selectedTopic.name);
  };

  const handleTopicOptionClick = (topic: Topic) => {
    handleTopicSelect(topic);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className='modal-content' onClick={handleContentClick}>
        <div className="modal-header">
          <h2 className="modal-title">{`Associate ${inputSubtopic} to:`}</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
            <div className="association-options-container" >
              
              <p className='p-association-options'>
                Discipline:
              </p>
              <input
                id='search-input'
                type="text"
                placeholder="Search..."
                autoComplete="off"
                disabled={selectedDisciplinesAssociation.length >= 5}
                value={inputSearchDisciplineAssociated}
                onChange={(e) => setInputSearchDisciplineAssociated(e.target.value)}
              />
              {disciplinesAssociation && disciplinesAssociation.length > 0 && (
                <ul className='ul-subtopics-card'>
                    {disciplinesAssociation.length > 0 ? (
                        disciplinesAssociation.map((discipline, index) => 
                            discipline.name.length > 0 ? (
                                <li 
                                    key={index}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        dispatch(selectDiciplineAssociated(discipline));
                                        handleDisciplineOptionClick(discipline);
                                        setInputSearchDisciplineAssociated('');
                                      }}
                                    className="subtopic-option"
                                >
                                    {discipline.name}
                                </li>
                            ) : null
                        )
                    ) : null}
                </ul>
                )}
              {selectedDisciplinesAssociation && selectedDisciplinesAssociation.length > 0 && (
                <ul className='ul-selected-disciplines-associated'>
                    {selectedDisciplinesAssociation.length > 0 ? (
                        selectedDisciplinesAssociation.map((discipline, index) => 
                            discipline.name.length > 0 ? (
                                <li 
                                    key={index}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="subtopic-option-selected"
                                >
                                    <p>{discipline.name}</p>
                                    <button className='button-deselect-item' onClick={() => dispatch(deselectDiciplineAssociated(discipline))}>
                                      <img src={IconCloseWhite} alt='close-icon-white'/>
                                    </button>
                                </li>
                            ) : null
                        )
                    ) : null}
                </ul>
                )}
            </div>
            <div className="association-options-container" >
              
              <p className='p-association-options'>
                Topic:
              </p>
              <input
                id='search-input'
                type="text"
                placeholder="Search..."
                autoComplete="off"
                disabled={selectedTopicsAssociation.length >= 5}
                value={inputSearchTopicAssociated}
                onChange={(e) => setInputSearchTopicAssociated(e.target.value)}
              />
              {topicsAssociation && topicsAssociation.length > 0 && (
                <ul className='ul-subtopics-card'>
                    {topicsAssociation.length > 0 ? (
                        topicsAssociation.map((topic: Topic, index) => 
                            topic.name.length > 0 ? (
                                <li 
                                    key={index}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        dispatch(selectTopicAssociated(topic));
                                        handleTopicOptionClick(topic);
                                        setInputSearchTopicAssociated('');
                                      }}
                                    className="subtopic-option"
                                >
                                    {topic.name}
                                </li>
                            ) : null
                        )
                    ) : null}
                </ul>
                )}
              {selectedTopicsAssociation && selectedTopicsAssociation.length > 0 && (
                <ul className='ul-selected-disciplines-associated'>
                    {selectedTopicsAssociation.length > 0 ? (
                        selectedTopicsAssociation.map((topic: Topic, index: number) => 
                            topic.name.length > 0 ? (
                                <li 
                                    key={index}
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="subtopic-option-selected"
                                >
                                    <p>{topic.name}</p>
                                    <button className='button-deselect-item' onClick={() => dispatch(deselectTopicAssociated(topic))}>
                                      <img src={IconCloseWhite} alt='close-icon-white'/>
                                    </button>
                                </li>
                            ) : null
                        )
                    ) : null}
                </ul>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSubtopicCardAssociations;