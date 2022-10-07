
import { useElementWidth } from "../../hooks/useElementWidth";
import { MOBILE_WIDTH } from "../../const";
import { useState } from "react";
import EditInvoice from "../../components/EditInvoice/EditInvoice";
import EditInvoiceMobile from "../../components/EditInvoiceMobile/EditInvoiceMobile";

function NewInvoicePage() {

  const [, width] = useElementWidth();
  const [viewActive, setViewActive] = useState(true);

  if (width <= MOBILE_WIDTH) {
    return (<EditInvoiceMobile newInvoice={true} />);
  } else {
    return (<EditInvoice active={viewActive} setActive={setViewActive} newInvoice={true} />);
  }

}

export default NewInvoicePage;