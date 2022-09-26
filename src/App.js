import AppBar from './components/AppBar/AppBar';
import Invoices from './pages/Invoices';
import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ViewInvoice from './pages/ViewInvoice';
import NewInvoice from './pages/NewInvoice';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="/" element={<Navigate to="invoices" replace />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<ViewInvoice />} />
          <Route path="invoices/new" element={<NewInvoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
