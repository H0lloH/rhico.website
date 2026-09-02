import { useEffect } from 'react';

import { SITE } from '@rhico/shared';

/**
 * Sets document.title to `<page> — <site title>` while the calling component is
 * mounted, restoring the previous title on unmount.
 */
export default function useDocumentTitle(page_title) {
    useEffect(() => {
        const previous = document.title;
        document.title = page_title ? `${page_title} — ${SITE.name}` : SITE.title;

        return () => {
            document.title = previous;
        };
    }, [page_title]);
}
