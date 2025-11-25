import React, {useEffect, useMemo, useRef, useState} from 'react';
import ModelPlanTableExtendedFilter from './ModelPlansTableExtendedFilter';
import useMyI18n from '../../../shared/lib/useMyI18n';
import {useCapitalizeFirstLetter} from '../../../shared/lib';

export default function ModelPlanFilter(props) {
    const { t } = useMyI18n();
    const {
        packageDetail = [],
        onSearchFilter,
        onPriceRangeFilter,
        onDataSovereigntyFilter,
        onCloudFilter,
        filterSelected,
        children,
    } = props || {};

    const dsRef = useRef(null);
    const [selectedDataSovereigntyOptions, setSelectedDataSovereigntyOptions] = useState([]);
    const [selectedPriceRangeOption, setSelectedPriceRangeOption] = useState('');
    const [search, setSearch] = useState('');
    const [cloudFilter, setCloudFilter] = useState('All');
    const searchRef = useRef(null);
    const priceRef = useRef(null);

    // helper hook to attach native listeners to web components
    function useWebComponentEvent(ref, eventName, handler, deps = []) {
        useEffect(() => {
            const el = ref && ref.current;
            if (!el || typeof el.addEventListener !== 'function') return;
            el.addEventListener(eventName, handler);
            return () => el.removeEventListener(eventName, handler);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ref?.current, ...deps]);
    }

    // attach listener to scale-text-field -> 'scale-change'
    useWebComponentEvent(
        searchRef,
        'scale-change',
        (e) => {
            const val = e?.detail?.value ?? '';
            setSearch(val);
            if (typeof onSearchFilter === 'function') onSearchFilter(val);
        },
        [onSearchFilter]
    );

    // attach listener to price dropdown
    useWebComponentEvent(
        priceRef,
        'scale-change',
        (e) => {
            const val = e?.detail?.value ?? '';
            setSelectedPriceRangeOption(val);
            if (typeof onPriceRangeFilter === 'function') onPriceRangeFilter(val);
        },
        [onPriceRangeFilter]
    );

    // attach listener to cloud dropdown
    useEffect(() => {
        let el = document.getElementById('cloud-dropdown');

        // helper to attach handler
        const attach = (node) => {
            if (!node || typeof node.addEventListener !== 'function') return;
            function handler(e) {
                const val = e?.detail?.value ?? 'All';
                setCloudFilter(val);
                if (typeof onCloudFilter === 'function') onCloudFilter(val);
            }
            node.addEventListener('scale-change', handler);
            return () => node.removeEventListener('scale-change', handler);
        };

        // attach immediately if present
        if (el) {
            return attach(el);
        }

        // otherwise watch the DOM for the element (one-off)
        const mo = new MutationObserver(() => {
            el = document.getElementById('cloud-dropdown');
            if (el) {
                const cleanup = attach(el);
                mo.disconnect();
                // ensure cleanup on unmount
                const unmountCleanup = () => cleanup && cleanup();
                // register one-time cleanup
                // return function from effect:
                // but MutationObserver callback can't return cleanup; so attach to outer scope
                // we store it on el for later removal:
                el.__cleanup = unmountCleanup;
            }
        });

        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            mo.disconnect();
            const elNow = document.getElementById('cloud-dropdown');
            if (elNow && elNow.__cleanup) {
                elNow.__cleanup();
                delete elNow.__cleanup;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onCloudFilter]);


    const dataSovereigntyOptions = useMemo(() => {
        const unique = new Set();
        (packageDetail || []).forEach((item) => {
            if (item.serverLocation && item.serverLocation !== '-') unique.add(item.serverLocation);
        });
        return Array.from(unique).map((name) => ({ name }));
    }, [packageDetail]);

    const cloudOptions = useMemo(() => {
        const unique = new Set();
        (packageDetail || []).forEach((item) => {
            if (item.cloud && item.cloud !== '-') {
                unique.add(useCapitalizeFirstLetter((item.cloud || '').toLowerCase()));
            }
        });
        return Array.from(unique);
    }, [packageDetail]);

    const showClear =
        (selectedDataSovereigntyOptions && selectedDataSovereigntyOptions.length > 0) ||
        (search && search !== '') ||
        (selectedPriceRangeOption && selectedPriceRangeOption !== '') ||
        (cloudFilter && cloudFilter !== 'All');

    useWebComponentEvent(
        dsRef,
        'scale-change',
        (e) => {
            const value = e?.detail?.value ?? '';
            const selectedArray = value ? [{ name: value }] : [];
            setSelectedDataSovereigntyOptions(selectedArray);
            if (typeof onDataSovereigntyFilter === 'function') onDataSovereigntyFilter(selectedArray);
        },
        [onDataSovereigntyFilter]
    );

    return (
        <div className="my-column my-gap-2 filter-border">
            <div className="my-row my-justify-space-around my-gap-3">
                <div className="my-flex">
                    {/* NOTE: removed onScale-change prop — using ref + addEventListener instead */}
                    <scale-text-field
                        ref={searchRef}
                        label={t('PLANS.SEARCH')}
                        value={search}
                        style={{ position: 'relative' }}
                    >
                        <scale-icon-action-search
                            size="20"
                            accessibility-title="search"
                            style={{ position: 'absolute', right: 10, top: 12, zIndex: 33, cursor: 'pointer' }}
                        />
                    </scale-text-field>
                </div>

                <div className="my-flex">
                    <scale-dropdown-select
                        ref={priceRef}
                        label={t('PLANS.PRICE_RANGE')}
                        value={selectedPriceRangeOption}
                    >
                        <scale-dropdown-select-item value="0-2">{t('PLANS.PRICE_RANGE_UNDER_2')}</scale-dropdown-select-item>
                        <scale-dropdown-select-item value="2-5">{t('PLANS.PRICE_RANGE_2_TO_5')}</scale-dropdown-select-item>
                        <scale-dropdown-select-item value="5">{t('PLANS.PRICE_RANGE_OVER_5')}</scale-dropdown-select-item>
                    </scale-dropdown-select>
                </div>

                <div className="my-flex">
                        <scale-dropdown-select
                            ref={dsRef}
                            label={t('PLANS.SERVER_LOCATION')}
                            value={selectedDataSovereigntyOptions?.[0]?.name || ''}
                            // optional: allow clearing (depends on scale component API)
                            // clearable
                        >
                            <scale-dropdown-select-item value="">
                                {t('PLANS.MODELS.ALL_SERVER_LOCATION') /* optional: placeholder empty */}
                            </scale-dropdown-select-item>

                            {dataSovereigntyOptions.map((opt) => (
                                <scale-dropdown-select-item key={opt.name} value={opt.name}>
                                    {opt.name}
                                </scale-dropdown-select-item>
                            ))}
                        </scale-dropdown-select>
                </div>

                <div className="my-flex my-row my-justify-end">
                    <ModelPlanTableExtendedFilter>
                        <div slot="cloud-filter">
                            <scale-dropdown-select
                                id="cloud-dropdown"
                                label={t('PLANS.CLOUD')}
                                value={cloudFilter}
                            >
                                <scale-dropdown-select-item value="All">All</scale-dropdown-select-item>
                                {cloudOptions.map((item) => (
                                    <scale-dropdown-select-item key={item} value={item}>
                                        {item}
                                    </scale-dropdown-select-item>
                                ))}
                            </scale-dropdown-select>
                        </div>
                    </ModelPlanTableExtendedFilter>
                </div>
            </div>

            <div className="my-row my-justify-space-between my-align-center">
                <div className="my-row my-gap-3">{filterSelected || children}</div>

                {showClear && (
                    <scale-button
                        variant="secondary"
                        onClick={() => {
                            setSelectedDataSovereigntyOptions([]);
                            setSearch('');
                            setSelectedPriceRangeOption('');
                            setCloudFilter('All');

                            if (typeof onDataSovereigntyFilter === 'function') onDataSovereigntyFilter([]);
                            if (typeof onCloudFilter === 'function') onCloudFilter('All');
                            if (typeof onPriceRangeFilter === 'function') onPriceRangeFilter('');
                            if (typeof onSearchFilter === 'function') onSearchFilter('');
                        }}
                    >
                        <scale-icon-action-close size="18" accessibility-title="close" selected />
                        {t('PLANS.CLEAR_FILTER')}
                    </scale-button>
                )}
            </div>
        </div>
    );
}
