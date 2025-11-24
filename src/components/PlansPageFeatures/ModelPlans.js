import React, { useEffect, useMemo, useRef, useState } from 'react';
import ModelPlansFilter from './PlansFilter/ModelPlansFilter';
import ModelPlansTable from './ModelPlansTable';
import {useCapitalizeFirstLetter} from '../../shared/lib';
import useMyI18n from '../../shared/lib/useMyI18n';
import { PlansHistory } from './PlansData/PlansModelData/';

function ModelPlans(props) {
    const { onSelectedPlanId } = props || {};
    const { t } = useMyI18n();

    const modelList = [
        { packageName: 'Tarif Basic Template', label: 'Basic' },
        { packageName: 'Tarif Standard1000 Template', label: 'Standard 1000' },
        { packageName: 'Tarif Standard2000 Template', label: 'Standard 2000' },
        { packageName: 'Tarif Standard3000 Template', label: 'Standard 3000' },
        { packageName: 'Tarif Standard4000 Template', label: 'Standard 4000' },
    ];

    const [selectedPlanName, setSelectedPlanName] = useState('Tarif Basic Template');
    const [allStandardPackages, setAllStandardPackages] = useState([]);
    const [selectedPlanDetail, setSelectedPlanDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        searchFilter: '',
        cloudFilter: 'All',
        dataSovereigntyFilter: [],
        priceRangeFilter: '',
    });

    useEffect(() => {
         function fetchAllStandardPackages() {
            try {
                setIsLoading(true);
                setAllStandardPackages(PlansHistory);
                selectPackage(selectedPlanName, PlansHistory);
            } catch (err) {
                console.error('Error fetching packages:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAllStandardPackages();
    }, []);

    function selectPackage(packageName, packages = allStandardPackages) {
        if (typeof onSelectedPlanId === 'function') onSelectedPlanId(packageName);
        setSelectedPlanName(packageName);
        const found = (packages || []).find((p) => p?.packageName === packageName) || {};
        setSelectedPlanDetail(found);
        setFilters({
            searchFilter: '',
            cloudFilter: 'All',
            dataSovereigntyFilter: [],
            priceRangeFilter: '',
        });
    }

    const parseNumber = (value, defaultValue = 0) => {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? defaultValue : parsed;
    };

    const rows = useMemo(() => {
        const result = [];
        const mqcs = selectedPlanDetail?.modelQuotaConfigs || [];

        mqcs.forEach((item) => {
            result.push({
                cloud: (item?.deploymentRegion || '-').split('-')[0]?.toUpperCase() || '-',
                creator: '-',
                name: {
                    heading: item?.exactModelName,
                    subHeading: item?.modelLabel,
                    license: item?.license,
                },
                inputPrice: parseNumber(item?.inputPricePerMillionTokens),
                outputPrice: parseNumber(item?.outputPricePerMillionTokens),
                serverLocation:
                    item?.deploymentCountry ||
                    useCapitalizeFirstLetter((item?.deploymentRegion || '').split('-')[1] || '-'),
                inputToken: parseNumber(item?.inputTokenPerMinuteLimit),
                outputToken: parseNumber(item?.outputTokenPerMinuteLimit),
                RPMLimit: parseNumber(item?.requestPerMinuteLimit),
                metaPricing: false,
                parentModel: true,
            });

            if (item?.modelQuotaMetadata?.data) {
                item.modelQuotaMetadata.data.forEach((customItem) => {
                    result.push({
                        cloud: (item?.deploymentRegion || '-').split('-')[0]?.toUpperCase() || '-',
                        creator: '-',
                        name: {
                            heading: item?.exactModelName,
                            subHeading: customItem?.modelLabel,
                            license: item?.license,
                        },
                        inputPrice: parseNumber(
                            customItem?.inputPricePerMillionTokens,
                            customItem?.inputPricePerMillionTokens
                        ),
                        outputPrice: parseNumber(
                            customItem?.outputPricePerMillionTokens,
                            customItem?.outputPricePerMillionTokens
                        ),
                        serverLocation:
                            item?.deploymentCountry ||
                            useCapitalizeFirstLetter((item?.deploymentRegion || '').split('-')[1] || '-'),
                        inputToken: parseNumber(customItem?.inputTpmLimit, customItem?.inputTpmLimit),
                        outputToken: parseNumber(customItem?.outputTpmLimit, customItem?.outputTpmLimit),
                        RPMLimit: parseNumber(customItem?.rpmLimit, customItem?.rpmLimit),
                        metaPricing: true,
                    });
                });
            }
        });

        return result;
    }, [selectedPlanDetail]);

    const filteredRows = useMemo(() => {
        let result = rows;

        if (filters.searchFilter) {
            const search = filters.searchFilter.toLowerCase();
            result = result.filter(
                (row) =>
                    (row.name?.heading || '').toLowerCase().includes(search) ||
                    (row.name?.subHeading || '').toLowerCase().includes(search) ||
                    (row.serverLocation || '').toLowerCase().includes(search)
            );
        }

        if (filters.cloudFilter && filters.cloudFilter !== 'All') {
            result = result.filter((row) => (row.cloud || '').toLowerCase() === filters.cloudFilter.toLowerCase());
        }

        if (filters.dataSovereigntyFilter && filters.dataSovereigntyFilter.length > 0) {
            const allowed = filters.dataSovereigntyFilter.map((f) =>
                (f.name || '').replace(/ \(Data Sovereignty\)/, '').toLowerCase()
            );
            result = result.filter((row) => allowed.includes((row.serverLocation || '').toLowerCase()));
        }

        if (filters.priceRangeFilter) {
            const value = filters.priceRangeFilter;
            if (value.includes('-')) {
                const [min, max] = value.split('-').map(Number);
                result = result.filter((row) => Number(row.inputPrice) >= min && Number(row.inputPrice) < max);
            } else {
                const min = Number(value);
                result = result.filter((row) => Number(row.inputPrice) >= min);
            }
        }

        return result;
    }, [rows, filters]);

    // --- handle custom 'scale-change' event on the custom dropdown element ---
    const dropdownRef = useRef(null);
    useEffect(() => {
        const el = dropdownRef.current;
        if (!el) return;
        function onScaleChange(ev) {
            // custom event detail shape used in your Vue -> { detail: { value } }
            const value = ev?.detail?.value;
            if (value) selectPackage(value);
        }
        el.addEventListener('scale-change', onScaleChange);
        return () => el.removeEventListener('scale-change', onScaleChange);
    }, [allStandardPackages]); // reattach if packages change

    return (
        <div className="my-column">
            <span className="scl-font-variant-body-large font-size-32 font-weight-600">{t('PLANS.MODELS.TITLE')}</span>
            <span className="scl-font-variant-body">{t('PLANS.MODELS.SUBTITLE')}</span>

            <div className="my-row my-justify-space-between my-align-center">
                <div className="my-input-width-0-5 my-mt-4">
                    {/* use a ref and listen for 'scale-change' emitted by the web component */}
                    <scale-dropdown-select ref={dropdownRef} value={selectedPlanName} label={t('PLANS.MODELS.SELECTED_RATE_PLAN')}>
                        {modelList.map((model) => (
                            <scale-dropdown-select-item key={model.packageName} value={model.packageName}>
                                {model.label}
                            </scale-dropdown-select-item>
                        ))}
                    </scale-dropdown-select>
                </div>
            </div>

            {isLoading ? (
                <div className="my-row my-justify-center my-my-6">
                    <scale-loading-spinner text={t('PLANS.MODELS.LOADING')} />
                </div>
            ) : (
                <div className="my-mt-4">
                    <ModelPlansFilter
                        key={selectedPlanName}
                        packageDetail={rows}
                        onSearchFilter={(val) => setFilters((prev) => ({ ...prev, searchFilter: val }))}
                        onPriceRangeFilter={(val) => setFilters((prev) => ({ ...prev, priceRangeFilter: val }))}
                        onDataSovereigntyFilter={(val) => setFilters((prev) => ({ ...prev, dataSovereigntyFilter: val }))}
                        onCloudFilter={(val) => setFilters((prev) => ({ ...prev, cloudFilter: val }))}
                        filterSelected={
                            <>
                                {(!filters?.dataSovereigntyFilter || filters?.dataSovereigntyFilter.length === 0) ? (
                                    <scale-tag>{t('PLANS.MODELS.ALL_DATA_SOVEREIGNTY')}</scale-tag>
                                ) : (
                                    filters.dataSovereigntyFilter.map((item, idx) => (
                                        <scale-tag key={idx}>
                                            {(item?.name || '') + ' ' + t('PLANS.MODELS.DATA_SOVEREIGNTY_SUFFIX')}
                                        </scale-tag>
                                    ))
                                )}

                                <scale-tag>
                                    {(filters?.cloudFilter === undefined || filters?.cloudFilter === 'All')
                                        ? t('PLANS.MODELS.ALL_CLOUD')
                                        : filters.cloudFilter}
                                </scale-tag>
                            </>
                        }
                    />

                    <div className="my-mt-4">
                        <ModelPlansTable filteredRows={filteredRows || []} allStandardPackages={allStandardPackages || []} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModelPlans;
