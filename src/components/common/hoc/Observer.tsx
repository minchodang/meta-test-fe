import React, { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';

interface ObserverProps {
    rootMargin?: string;
    threshold?: number;
    onObserve: VoidFunction;
}

const Observer: FC<PropsWithChildren<ObserverProps>> = ({
    rootMargin = '0px',
    threshold = 0.3,
    onObserve,
    children,
}) => {
    const observerRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting) onObserve();
        },
        [onObserve],
    );

    useEffect(() => {
        const options = { root: null, rootMargin, threshold };
        const observer = new IntersectionObserver(handleObserver, options);

        const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => observer.disconnect();
    }, [handleObserver, rootMargin, threshold]);

    return (
        <div className="min-h-8 min-h-max w-full" ref={observerRef}>
            {children}
        </div>
    );
};

export default Observer;
