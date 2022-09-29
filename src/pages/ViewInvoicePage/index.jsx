import ViewInvoice from "../../components/ViewInvoice/ViewInvoice";
import ViewInvoiceMobile from "../../components/ViewInvoiceMobile/ViewInvoiceMobile";

import { useElementWidth } from "../../hooks/useElementWidth";
import { MOBILE_WIDTH } from "../../const";

function ViewInvoicePage() {

  const [, width] = useElementWidth();
  
  return (width <= MOBILE_WIDTH ? <ViewInvoiceMobile /> : <ViewInvoice />);

}

export default ViewInvoicePage;
