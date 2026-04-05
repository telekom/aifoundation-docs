import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useMyI18n from '../../../shared/lib/useMyI18n';

export default function SidebarFilter({ activator, cloudFilter, children }) {
    const { t } = useMyI18n();
    const [showFilter, setShowFilter] = useState(false);

    function closeFilter() {
        setShowFilter(false);
    }
    function openFilter() {
        setShowFilter(true);
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') closeFilter();
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    // Activator: render activator prop as render-prop or default button
    const activatorNode = activator ? (
        activator({ on: openFilter })
    ) : (
        <scale-button variant="secondary" onClick={() => setShowFilter((s) => !s)}>
            <scale-icon-action-filter-2 size="18" accessibility-title="filter-2" />
            {t('PLANS.SHOW_MORE_FILTER')}
        </scale-button>
    );

    // Sidebar content to portal
    const sidebar = showFilter ? (
        <>
            <div className="sidebar-backdrop" onClick={closeFilter} />

            <div className="sidebar">
                <div className="my-row my-justify-space-between my-align-center my-mx-6 my-my-6">
                    <p className="scl-font-variant-heading-4">{t('PLANS.ADDITIONAL_FILTERS')}</p>
                    <scale-button variant="secondary" size="small" onClick={closeFilter} icon-only>
                        <scale-icon-action-close size="16" accessibility-title="close" />
                    </scale-button>
                </div>

                <div className="my-mx-6 my-my-6 my-column my-gap-6">
                    {/* cloud-filter slot */}
                    {cloudFilter}

                    {/* children can contain additional slot content like commented TODO filters */}
                    {children}
                </div>
            </div>
        </>
    ) : null;

    return (
        <>
            {activatorNode}
            {typeof document !== 'undefined' && createPortal(sidebar, document.body)}

            <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background: var(--telekom-color-background-surface);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }

        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--telekom-color-background-backdrop);
          z-index: 999;
        }

        .filter-border {
          padding: 12px;
          opacity: 1;
          border-radius: 8px;
          border: 1px solid var(--telekom-color-ui-border-standard);
        }
      `}</style>
        </>
    );
}
