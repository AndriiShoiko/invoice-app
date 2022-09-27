import AppBar from './components/AppBar/AppBar';
import InvoicesPage from './pages/InvoicesPage';
import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ViewInvoicePage from './pages/ViewInvoicePage';
import NewInvoicePage from './pages/NewInvoicePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="/" element={<Navigate to="invoices" replace />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="invoices/:id" element={<ViewInvoicePage />} />
          <Route path="invoices/new" element={<NewInvoicePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
