import React, {useMemo, useState} from 'react';
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

    const [selectedDataSovereigntyOptions, setSelectedDataSovereigntyOptions] = useState([]);
    const [selectedPriceRangeOption, setSelectedPriceRangeOption] = useState('');
    const [search, setSearch] = useState('');
    const [cloudFilter, setCloudFilter] = useState('All');

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

    function handleSearchChange(e) {
        const val = e.target.value;
        setSearch(val);
        if (typeof onSearchFilter === 'function') onSearchFilter(val);
    }

    function handlePriceRangeChange(e) {
        const val = e.target.value;
        setSelectedPriceRangeOption(val);
        if (typeof onPriceRangeFilter === 'function') onPriceRangeFilter(val);
    }

    function handleDataSovereigntyChange(e) {
        const value = e.target.value;
        const selectedArray = value ? [{ name: value }] : [];
        setSelectedDataSovereigntyOptions(selectedArray);
        if (typeof onDataSovereigntyFilter === 'function') onDataSovereigntyFilter(selectedArray);
    }

    function handleCloudChange(e) {
        const val = e.target.value;
        setCloudFilter(val);
        if (typeof onCloudFilter === 'function') onCloudFilter(val);
    }

    function handleClear() {
        setSelectedDataSovereigntyOptions([]);
        setSearch('');
        setSelectedPriceRangeOption('');
        setCloudFilter('All');

        if (typeof onDataSovereigntyFilter === 'function') onDataSovereigntyFilter([]);
        if (typeof onCloudFilter === 'function') onCloudFilter('All');
        if (typeof onPriceRangeFilter === 'function') onPriceRangeFilter('');
        if (typeof onSearchFilter === 'function') onSearchFilter('');
    }

    const selectStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
    const labelStyle = { display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c6c6c' };

    return (
        <div className="my-column my-gap-2 filter-border">
            <div className="my-row my-justify-space-around my-gap-3">
                <div className="my-flex">
                    <label htmlFor="plans-search" style={labelStyle}>{t('PLANS.SEARCH')}</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="plans-search"
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder={t('PLANS.SEARCH')}
                            style={{ ...selectStyle, paddingRight: '32px' }}
                        />
                        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '16px' }}>
                            &#128269;
                        </span>
                    </div>
                </div>

                <div className="my-flex">
                    <label htmlFor="plans-price-range" style={labelStyle}>{t('PLANS.PRICE_RANGE')}</label>
                    <select
                        id="plans-price-range"
                        value={selectedPriceRangeOption}
                        onChange={handlePriceRangeChange}
                        style={selectStyle}
                    >
                        <option value="">{t('PLANS.PRICE_RANGE')}</option>
                        <option value="0-2">{t('PLANS.PRICE_RANGE_UNDER_2')}</option>
                        <option value="2-5">{t('PLANS.PRICE_RANGE_2_TO_5')}</option>
                        <option value="5">{t('PLANS.PRICE_RANGE_OVER_5')}</option>
                    </select>
                </div>

                <div className="my-flex">
                    <label htmlFor="plans-server-location" style={labelStyle}>{t('PLANS.SERVER_LOCATION')}</label>
                    <select
                        id="plans-server-location"
                        value={selectedDataSovereigntyOptions?.[0]?.name || ''}
                        onChange={handleDataSovereigntyChange}
                        style={selectStyle}
                    >
                        <option value="">
                            {t('PLANS.MODELS.ALL_SERVER_LOCATION')}
                        </option>
                        {dataSovereigntyOptions.map((opt) => (
                            <option key={opt.name} value={opt.name}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="my-flex my-row my-justify-end">
                    <ModelPlanTableExtendedFilter>
                        <div slot="cloud-filter">
                            <label htmlFor="cloud-dropdown" style={labelStyle}>{t('PLANS.CLOUD')}</label>
                            <select
                                id="cloud-dropdown"
                                value={cloudFilter}
                                onChange={handleCloudChange}
                                style={selectStyle}
                            >
                                <option value="All">All</option>
                                {cloudOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </ModelPlanTableExtendedFilter>
                </div>
            </div>

            <div className="my-row my-justify-space-between my-align-center">
                <div className="my-row my-gap-3">{filterSelected || children}</div>

                {showClear && (
                    <button
                        type="button"
                        onClick={handleClear}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                    >
                        &#10005; {t('PLANS.CLEAR_FILTER')}
                    </button>
                )}
            </div>
        </div>
    );
}
