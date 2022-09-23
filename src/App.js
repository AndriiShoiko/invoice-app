import AppBar from './components/AppBar/AppBar';
import Header from './components/Header/Header';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <AppBar />
      <div className="wrapper">
        <Header />
      </div>
    </div>
  );
}

export default App;
