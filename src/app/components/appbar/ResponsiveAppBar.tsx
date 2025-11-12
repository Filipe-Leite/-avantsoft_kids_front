import {useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import { AppDispatch } from '../../store';
import UserProfileButton from './UserProfileButton';
import SearchBar from './SeachBar';
// import * as REQUEST_REQUIREMENTS from '../../api/requestRequirements';
import menuIcon from '../../../assets/menu-icon-white.svg';
import apiceLogo from '../../../assets/apice_logo_white_backgroud_transparent.png';
import SearchIcon from '../../../assets/icon-blank-50-white.png';
// import useSocketSetup from './useSocketSetup';
import './responsiveAppBar.css';

export default function ResponsiveAppBar (){
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  // const currentUser = useSelector((state: RootState) => state.session.currentUser);
  // const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch<AppDispatch>();
  const userValidated = useSelector((state: RootState) => state.session.loggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [searchInput, setSearchInput] = useState('');
  // const [PRIVATE_ROUTES,setPrivateRoutes]= useState<REQUEST_REQUIREMENTS.EndPoints>();
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  // const [optionClickedCloseSidebar,setOptionClickedCloseSidebar] = useState(false);
  const [searchInputQuery, setSearchInputQuery] = useState<string>('');
  const isMobile = window.matchMedia('(hover: none)').matches;
  const [searchClicked, setSearchClicked] = useState<boolean>(!isMobile);

  useEffect(() => {

    const currentLocalization = location.pathname.split('/')[1] 
    
    if (currentLocalization !== 'search'){
      setSearchInputQuery('')
    }

  }, [location]);

  useEffect(() => {
    if (userValidated) {
      setIsMenuOpen(false);
    }
  }, [userValidated]);

  const handleSignIn = () => {
    navigate('/auth/sign_in');
  };

  const handleSideBarCloseOpen = (isClicked: boolean) => {
    setMenuButtonClicked(!isClicked);
  };

  return (
    <div>
      <div id="header-app-tool-bar">
        <div id="container-app-tool-bar">
          <div id="toolbar">
            <div id='logo-search-input'>
              {
                userValidated === true ?
                  <button id='menu-button' onClick={() => handleSideBarCloseOpen(menuButtonClicked)}>
                    <img src={menuIcon} alt='menu-icon'/>
                  </button>
                :
                null
              }
              <div id='container-logo' onClick={() => console.log("asdasd")}>
                <img src={apiceLogo} alt='apice-logo' />
              </div>

              {
                userValidated ?

                <div>
                  { (!searchClicked && isMobile) ?
                      
                      <div>
                        <button id='button-search' onClick={() => setSearchClicked(!searchClicked)}>
                          <img src={SearchIcon} alt='search-icon'/>
                        </button>
                      </div>
      
                      :
      
                      <SearchBar 
                        searchInputQuery={searchInputQuery} 
                        setSearchInputQuery={setSearchInputQuery}
                        setShowComponent={setSearchClicked}
                      />
                  }
                </div>
                :

                null
              }
            </div>

            
            
            <div id='Container'>
              <div id='menu-container' ref={dropDownRef}>
                <UserProfileButton
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  onSignIn={handleSignIn}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* {menuButtonClicked && userValidated == true ?
        <SideBar close={() => handleSideBarCloseOpen(menuButtonClicked)}/>
        :
        null
      } */}
    </div>
  );
}