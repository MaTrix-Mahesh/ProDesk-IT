import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#050508] text-gray-100 selection:bg-red-500 selection:text-white">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
export default App;