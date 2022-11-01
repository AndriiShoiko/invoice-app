import AppBar from './components/AppBar/AppBar';
import InvoicesPage from './pages/InvoicesPage';
import './styles/App.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ViewInvoicePage from './pages/ViewInvoicePage';
import NewInvoicePage from './pages/NewInvoicePage';
import EditInvoicePage from './pages/EditInvoicePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="invoice-app" element={<InvoicesPage />} />
          <Route path="invoice-app/:id" element={<ViewInvoicePage />} />
          <Route path="invoice-app/:id/edit" element={<EditInvoicePage />} />
          <Route path="invoice-app/new" element={<NewInvoicePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
