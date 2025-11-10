import RoutesApp from './routes/RoutesApp';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthProvider from './contexts/auth';
import 'react-toastify/dist/ReactToastify.css';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <div className="App">
        <SkeletonTheme baseColor="#818181ff" highlightColor="#b40202ff">
          <ToastContainer autoClose={3000} />
          <AuthProvider>
            <RoutesApp/>
          </AuthProvider>
        </SkeletonTheme>
      </div>
  );
}

export default App;
