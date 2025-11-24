import React, { useEffect, useState } from 'react';
import './chooseSubtopicCardAssociationsModal.css';
import { Discipline, Subtopic } from '../../#interfaces/slicesInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getSearch } from '../../../features/sessionBusiness/sessionNavigation';
import { deselectDiciplineAssociated, selectDiciplineAssociated } from '../../../features/sessionBusiness/sessionCards';
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
  const [inputSearchDisciplineAssociated, setInputSearchDisciplineAssociated] = useState('');
  const [inputSearchTopicAssociated, setInputSearchTopicAssociated] = useState('');
  const selectedDisciplinesAssociation = useSelector((state: RootState) => state.sessionCards.selectedDisciplinesAssociation);
  const dispatch = useDispatch<AppDispatch>()
  let disciplinesList: Discipline[] = [];

  console.log("inputSubtopic >>> ", inputSubtopic)

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

  const handleSubtopicSelect = (selectedDiscipline: Discipline) => {
      disciplinesList = [...disciplinesList, selectedDiscipline]
      setInputSearchDisciplineAssociated(selectedDiscipline.name);
  };

  const handleDisciplineOptionClick = (discipline: Discipline) => {
      handleSubtopicSelect(discipline);
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
        </div>
      </div>
    </div>
  );
};

export default ChooseSubtopicCardAssociations;