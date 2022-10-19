import ContentLoader from "react-content-loader";
import { MOBILE_WIDTH } from "../../const";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useElementWidth } from "../../hooks/useElementWidth";

function InvoiceListSkeleton(props) {

    const isDarkMode = useDarkMode();
    const [, width] = useElementWidth();

    function loader() {
        return (
            <ContentLoader
                speed={2}
                width={"100%"}
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
                <rect x="0" y="516" rx="3" ry="3" width="730" height="70" />
            </ContentLoader>
        )
    }

    function loaderMobile() {
        return (
            <ContentLoader
                speed={2}
                width={"100%"}
                height={600}
                viewBox="0 0 327 600"
                backgroundColor={(!isDarkMode) ? "#FFFFFF" : "#1E2139"}
                foregroundColor={(!isDarkMode) ? "#ecebeb" : "#ecebeb"}
                {...props}
            >
                <rect x="0" y="0" rx="3" ry="3" width="327" height="134" />
                <rect x="0" y="150" rx="3" ry="3" width="327" height="134" />
                <rect x="0" y="300" rx="3" ry="3" width="327" height="134" />
                <rect x="0" y="450" rx="3" ry="3" width="327" height="134" />
            </ContentLoader>
        )
    }

    return (width <= MOBILE_WIDTH ? loaderMobile() : loader());
}

export default InvoiceListSkeleton;

