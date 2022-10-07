import EditInvoiceMobile from "../../components/EditInvoiceMobile/EditInvoiceMobile";
import { MOBILE_WIDTH } from "../../const";
import { useElementWidth } from "../../hooks/useElementWidth";
import ViewInvoicePage from "../ViewInvoicePage";

function EditInvoicePage() {

    const [, width] = useElementWidth();

    return (width <= MOBILE_WIDTH ? <EditInvoiceMobile /> : <ViewInvoicePage edit={true} />);

}

export default EditInvoicePage;
