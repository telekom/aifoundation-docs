import React, { useMemo, useState } from 'react';
import PricingListTooltip from '../PlansPageFeatures/PlansWidgets/PricingListTooltip';
import { formatNumberEuropean, useCountryHelper } from '../../shared/lib';
import useMyI18n from '../../shared/lib/useMyI18n';

export default function ModelPlansTable(props) {
    const { filteredRows = [], allStandardPackages = [] } = props || {};
    const { t } = useMyI18n();
    const useCountry = useCountryHelper();

    const [sortConfig, setSortConfig] = useState(null); // { key, direction }

    const tableHeaders = [
        { name: t('PLANS.CLOUD'), sortable: true, key: 'cloud' },
        { name: t('PLANS.MODEL_NAME'), sortable: true, key: 'name' },
        { name: t('PLANS.INPUT_TOKEN_PRICE'), subLabel: t('PLANS.PRICE_UNIT_TOKENS'), sortable: true, key: 'inputPrice' },
        { name: t('PLANS.OUTPUT_TOKEN_PRICE'), subLabel: t('PLANS.PRICE_UNIT_TOKENS'), sortable: true, key: 'outputPrice' },
        { name: t('PLANS.SERVER_LOCATION'), sortable: true, key: 'serverLocation' },
        { name: t('PLANS.INPUT_TOKEN_LIMIT'), sortable: true, key: 'inputToken' },
        { name: t('PLANS.OUTPUT_TOKEN_LIMIT'), sortable: true, key: 'outputToken' },
        { name: t('PLANS.RPM_LIMIT'), subLabel: t('PLANS.PRICE_UNIT_REQUEST'), sortable: true, key: 'RPMLimit' },
    ];

    const sortedRows = useMemo(() => {
        if (!sortConfig) return filteredRows;

        const { key, direction } = sortConfig;

        return [...filteredRows].sort((a, b) => {
            if (key === 'name') {
                const aName = (a.name && a.name.heading) || '';
                const bName = (b.name && b.name.heading) || '';
                return direction === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
            }

            const aValue = a[key];
            const bValue = b[key];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }

            const aStr = String(aValue ?? '');
            const bStr = String(bValue ?? '');
            return direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
        });
    }, [filteredRows, sortConfig]);

    const handleSort = (key) => {
        const header = tableHeaders.find((h) => h.key === key);
        if (!header || !header.sortable) return;

        let direction = 'asc';
        if (sortConfig?.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }

        setSortConfig({ key, direction });
    };

    return (
        <div>
            <scale-table>
                <table>
                    <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index}>
                                <div className="my-row my-align-center my-gap-1">
                                    {header.sortable && (
                                        <span className="sort-icon" onClick={() => handleSort(header.key)}>
                        {sortConfig?.key === header.key && sortConfig?.direction === 'desc' ? (
                            <scale-icon-content-sort-indicator-down
                                size="16"
                                selected={sortConfig?.key === header.key}
                                {...(sortConfig?.key === header.key ? { fill: '#E20074' } : {})}
                                accessibility-title="sort-indicator-down"
                            />
                        ) : (
                            <scale-icon-content-sort-indicator-up
                                size="16"
                                selected={sortConfig?.key === header.key}
                                {...(sortConfig?.key === header.key ? { fill: '#E20074' } : {})}
                                accessibility-title="sort-indicator-up"
                            />
                        )}
                      </span>
                                    )}

                                    <div>
                                        {header.name}
                                        {header?.subLabel && <br />}
                                        {header?.subLabel && <span className="scl-font-variant-label">{header.subLabel}</span>}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {(!sortedRows || sortedRows.length === 0) ? (
                        <tr>
                            <td colSpan={9} className="my-text-align-center">
                                {t('PLANS.NO_PRICING_FOUND')}
                            </td>
                        </tr>
                    ) : (
                        sortedRows.map((modelDetail, idx) => (
                            <tr key={idx}>
                                <td>
                                    {modelDetail.cloud !== '-' ? (
                                        <scale-tag
                                            style={
                                                modelDetail.cloud && modelDetail.cloud.toLowerCase().includes('otc')
                                                    ? {
                                                        '--background': 'var(--telekom-color-primary-standard)',
                                                        '--color': 'white',
                                                    }
                                                    : undefined
                                            }
                                        >
                                            <span>{modelDetail.cloud}</span>
                                        </scale-tag>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>

                                <td>
                                    <b>{modelDetail.name?.heading}</b>
                                    {modelDetail.name?.subHeading && <br />}
                                    {modelDetail.name?.subHeading && <span>{modelDetail.name.subHeading}</span>}
                                    {modelDetail.name?.license && <br />}
                                    {modelDetail.name?.license && (
                                        <scale-link>
                                            <span className="scl-font-variant-caption">{modelDetail.name.license}</span>
                                        </scale-link>
                                    )}
                                </td>

                                <td>
                                    <div className="my-row my-align-center my-gap-1">
                                        <b>{`€ ${modelDetail.inputPrice}`}</b>
                                        {!modelDetail?.metaPricing && modelDetail.parentModel && modelDetail.name?.heading && (
                                            <PricingListTooltip
                                                allStandardPackages={allStandardPackages}
                                                pricingName={t('PLANS.INPUT_TOKEN_PRICE')}
                                                exactModelName={modelDetail.name.heading}
                                                key={modelDetail.name.heading + 'input'}
                                            />
                                        )}
                                    </div>
                                </td>

                                <td>
                                    <div className="my-row my-align-center my-gap-1">
                                        <b>{`€ ${modelDetail.outputPrice}`}</b>
                                        {!modelDetail?.metaPricing && modelDetail.parentModel && modelDetail.name?.heading && (
                                            <PricingListTooltip
                                                allStandardPackages={allStandardPackages}
                                                pricingName={t('PLANS.OUTPUT_TOKEN_PRICE')}
                                                exactModelName={modelDetail.name.heading}
                                                key={modelDetail.name.heading + 'output'}
                                            />
                                        )}
                                    </div>
                                </td>

                                <td>
                    <span>
                      {modelDetail.serverLocation !== '-' ? useCountry.searchCountries('name', modelDetail.serverLocation || '')[0]?.flag : ''}
                    </span>
                                    {modelDetail.serverLocation || '-'}
                                </td>

                                <td>{formatNumberEuropean(modelDetail.inputToken)}</td>
                                <td>{formatNumberEuropean(modelDetail.outputToken)}</td>
                                <td>{formatNumberEuropean(modelDetail.RPMLimit)}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </scale-table>

            <style jsx>{`
        .table th { padding: 8px; line-height: 18px; }
        .table td { padding-left: 14px; }
        .sort-icon { cursor: pointer; }
      `}</style>
        </div>
    );
}
