import { useRef, useState, useEffect } from "react";

export function useElementWidth() {

    const ref = useRef(document.querySelector('body'));
    const [width, setWidth] = useState(null);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            setWidth(width);
        })
    );

    useEffect(() => {
        observer.current.observe(ref.current);
    },
        [ref, observer]);

    return [ref, width];
}