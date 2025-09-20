import RoutesApp from './routes/RoutesApp';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <div className="App">
        <ToastContainer autoClose={3000} />
        <RoutesApp/>
    </div>
  );
}

export default App;
