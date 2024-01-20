import logo from './logo.svg';
import './App.css';
import SideBar from './components/sidebar';
import MainPage from './components/mainpage';
function App() {
  return (
    <div className="flex justify-center items-start">
      
      <div className="w-full">
        <MainPage />
      </div>
 
    </div>
  );
}

export default App;
