
import { useElementWidth } from "../../hooks/useElementWidth";
import { MOBILE_WIDTH } from "../../const";
import EditInvoiceMobile from "../../components/EditInvoiceMobile/EditInvoiceMobile";
import InvoiceList from "../../components/InvoiceList/InvoiceList";

function NewInvoicePage() {

  const [, width] = useElementWidth();
  //const [viewActive, setViewActive] = useState(true);

/*   if (width <= MOBILE_WIDTH) {
    return (<EditInvoiceMobile newInvoice={true} />);
  } else { */
    //return (<NewInvoice active={viewActive} setActive={setViewActive} />);

  //}

  return (<InvoiceList newInvoice={true}/>);

}

export default NewInvoicePage;