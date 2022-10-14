import ContentLoader from "react-content-loader";
import { useDarkMode } from "../../hooks/useDarkMode";

function InvoiceListSkeleton(props) {

    const isDarkMode = useDarkMode();

    return (
        <ContentLoader
            speed={2}
            width={730}
            height={600}
            viewBox="0 0 730 600"
            backgroundColor={(!isDarkMode) ? "#FFFFFF" : "#1E2139"}
            foregroundColor={(!isDarkMode) ? "#ecebeb" : "#ecebeb"}
            {...props}
        >
            <rect x="0" y="0" rx="3" ry="3" width="730" height="70" />
            <rect x="0" y="86" rx="3" ry="3" width="730" height="70" />
            <rect x="0" y="172" rx="3" ry="3" width="730" height="70" />
            <rect x="0" y="258" rx="3" ry="3" width="730" height="70" />
            <rect x="0" y="344" rx="3" ry="3" width="730" height="70" />
            <rect x="0" y="430" rx="3" ry="3" width="730" height="70" />
        </ContentLoader>
    )
}

export default InvoiceListSkeleton;

