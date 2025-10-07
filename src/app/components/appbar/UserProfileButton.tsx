// UserProfileButton.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import defaultProfileImage from '../../../assets/profile-white-52.png';
import logoutIcon from '../../../assets/logout-black.png';
import signInIcon from '../../../assets/login-white.png';
import configureIcon from '../../../assets/configure.svg';
// import { authenticateUserFromStorage, getLocalStorageAuthHeaders, signOutUser } from '../sessions/sessionSlice';
// import * as REQUEST_REQUIREMENTS from '../../api/requestRequirements';
import './responsiveAppBar.css';
// import { useNavigate } from 'react-router-dom';
// import { closeAllDialogueBoxes } from '../sessions/sessionDialogues';

interface UserProfileButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onSignIn: () => void;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({ isMenuOpen, setIsMenuOpen, onSignIn }) => {
  const currentUser = useSelector((state: RootState) => state.session.currentUser);
  const userValidated = useSelector((state: RootState) => state.session.loggedIn);
  // const avatar = useSelector((state: RootState) => state.session.userMoreInfo.avatarUrl) ;
  const avatar = defaultProfileImage;
  // const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  // const [PRIVATE_ROUTES,setPrivateRoutes] = useState<REQUEST_REQUIREMENTS.EndPoints>();
  
  // useEffect(()=>{
  //   async function authenticateUser() {
  //     if (!userValidated) {
  //       await dispatch(authenticateUserFromStorage());
  //     }
  //   }

  //   authenticateUser();

  //   if (currentUser){
      
  //     const routeParams = {
  //       userNickname: currentUser.nickname
  //     }

  //     const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: routeParams});

  //     setPrivateRoutes(PRIVATE_ROUTES);
  //   }

  //   authenticateUser();
  // },[currentUser])

  const handleProfileClick = () => {
    if (userValidated) {
      setIsMenuOpen(!isMenuOpen);
    } else {
        onSignIn();
    }
  };

  // async function handleLogout() {
  //   const authHeaders = getLocalStorageAuthHeaders();
  //   await dispatch(signOutUser(authHeaders));
  //   setIsMenuOpen(false);
  //   dispatch(closeAllDialogueBoxes());
  // }

  return (
    <div>
      { userValidated 
      
      ? 
      
      (
        <button className={`profile-button ${isMenuOpen ? 'active' : ''}`} onClick={handleProfileClick}>
          <img
            src={currentUser ? avatar || defaultProfileImage : defaultProfileImage}
            className="profile-image-app-bar"
            alt="menu-icon"
          />
        </button>
      ) : (
        <button className="sign-in-button" onClick={onSignIn}>
          <img src={signInIcon} className="sign-in-icon" alt="sign-in-icon" />
          <span>Sign In</span>
        </button>
      )}
      {userValidated && isMenuOpen && (
        <nav className={`menu active`}>
          <ul>
            <li onClick={() => {}}>
              <img src={configureIcon} className='configure-icon' alt='configure-icon' />
              <span>Configurations</span>
            </li>
            <li onClick={() => console.log('sdfsdf')}>
              <img src={logoutIcon} className='logout-icon' alt='logout-icon' />
              <span>Sign Out</span>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserProfileButton;