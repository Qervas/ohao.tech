'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    container?: HTMLElement;
}

const Portal: React.FC<PortalProps> = ({ children, container }) => {
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Use the provided container or create a new div in document.body
        const targetElement = container || document.body;
        setMountNode(targetElement);

        return () => {
            // Cleanup if we created our own container
            if (!container && mountNode) {
                document.body.removeChild(mountNode);
            }
        };
    }, [container]);

    return mountNode ? createPortal(children, mountNode) : null;
};

Portal.displayName = 'Portal';

export { Portal };
export type { PortalProps }; 