
import { useElementWidth } from "../../hooks/useElementWidth";
import { MOBILE_WIDTH } from "../../const";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import NewInvoiceMobile from "../../components/EditInvoiceMobile/NewInvoiceMobile";

function NewInvoicePage() {

  const [, width] = useElementWidth();

  if (width <= MOBILE_WIDTH) {
    return (<NewInvoiceMobile />);
  } else {
    return (<InvoiceList newInvoice={true} />);
  }

}

export default NewInvoicePage;