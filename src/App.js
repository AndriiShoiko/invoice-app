import AppBar from './components/AppBar/AppBar';
import Header from './components/Header/Header';
import InvoiceList from './components/InvoiceList/InvoiceList';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <AppBar />
      <div className="wrapper">
        <Header />
        <InvoiceList />
      </div>
    </div>
  );
}

export default App;
