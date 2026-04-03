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
        <button
            type="button"
            onClick={() => setShowFilter((s) => !s)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
        >
            &#9776; {t('PLANS.SHOW_MORE_FILTER')}
        </button>
    );

    // Sidebar content to portal
    const sidebar = showFilter ? (
        <>
            <div className="extended-filter-overlay" onClick={closeFilter} />

            <div className="extended-filter-panel">
                <div className="my-row my-justify-space-between my-align-center my-mx-6 my-my-6">
                    <p style={{ fontSize: '18px', fontWeight: '600' }}>{t('PLANS.ADDITIONAL_FILTERS')}</p>
                    <button
                        type="button"
                        onClick={closeFilter}
                        style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', fontSize: '14px' }}
                        aria-label="close"
                    >
                        &#10005;
                    </button>
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

            <style>{`
        .extended-filter-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background: #ffffff;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: auto;
        }

        .extended-filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .filter-border {
          padding: 12px;
          opacity: 1;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
        </>
    );
}
