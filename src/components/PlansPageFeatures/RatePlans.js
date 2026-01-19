import React, {useEffect, useRef} from 'react';
import useMyI18n from '../../shared/lib/useMyI18n';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';

export default function PlansRates() {
    const { t, locale, setLocale } = useMyI18n();

    const dropdownRef = useRef(null);

    useEffect(() => {
        const el = dropdownRef.current;
        if (!el) return;
        function onScaleChange(ev) {
            const value = ev?.detail?.value;
            if (value) setLocale(value);
        }
        el.addEventListener('scale-change', onScaleChange);
        return () => el.removeEventListener('scale-change', onScaleChange);
    }, [locale]);
    return (
        <div className="my-column">
            <div className="my-row my-justify-space-between my-align-center my-my-1">
                    <div className="scl-font-variant-body-large my-row my-align-center my-justify-center font-size-32 font-weight-600">
                        {t('PLANS.TITLE')}
                    </div>
                <div className="my-row my-justify-space-between">
                    <div className="my-input-width-0-5">
                        <scale-dropdown-select ref={dropdownRef} label={t("LANGUAGE")} value={locale}>
                            <scale-dropdown-select-item value="en">English</scale-dropdown-select-item>
                            <scale-dropdown-select-item value="de">Deutsch</scale-dropdown-select-item>
                        </scale-dropdown-select>
                    </div>
                </div>
            </div>
            <span className="scl-font-variant-body">
                {t('PLANS.SUBTITLE')}
                <br />
                {t('PLANS.SUBTITLE_2')}
            </span>
            <div className="my-column my-my-3">
                <scale-table >
                    <table style={{
                        border: 'var(--telekom-spacing-composition-space-01) solid var(--telekom-color-ui-faint) !important',
                    }}>
                        <thead>
                        <tr>
                            <th>{t('PLANS.TABLE_HEADERS.RATE_PLAN')}</th>
                            <th>{t('PLANS.TABLE_HEADERS.MINIMUM_CONSUMPTION')}</th>
                            <th style={{ lineHeight: '18px', padding: '8px' }}>
                                {t('PLANS.TABLE_HEADERS.TOKEN_PRICING')}
                                <br />
                                <span className="scl-font-variant-caption">{t('PLANS.TABLE_HEADERS.PER_MIL_TOKEN')}</span>
                            </th>
                            <th style={{ lineHeight: '18px', padding: '8px' }}>
                                {t('PLANS.TABLE_HEADERS.RPM_EXAMPLE')}
                                <br />
                                <span className="scl-font-variant-caption">{t('PLANS.TABLE_HEADERS.PER_REQUEST')}</span>
                            </th>
                            <th>{t('PLANS.TABLE_HEADERS.CLOUD_PROVIDER')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <scale-tag style={{ '--background': '#4de0af', '--color': 'black' }}>
                                    {t('PLANS.BASIC')}
                                </scale-tag>
                            </td>
                            <td>-</td>
                            <td>{t('PLANS.TOKEN_PRICE_BASIC')}</td>
                            <td>20</td>
                            <td>
                                <scale-tooltip content={t('PLANS.TOOLTIP_OTC')}>
                                    <scale-tag style={{ '--background': 'var(--telekom-color-primary-standard)', '--color': 'white' }}>
                                        {t('PLANS.OTC')}
                                    </scale-tag>
                                </scale-tooltip>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <scale-tag style={{ '--background': '#4ad9cd', '--color': 'black' }}>
                                    {t('PLANS.STANDARD_1000')}
                                </scale-tag>
                            </td>
                            <td><b>{t('PLANS.COST_1000')}</b></td>
                            <td>{t('PLANS.TOKEN_PRICE_1000')}</td>
                            <td>150</td>
                            <td>
                                <div className="my-row my-gap-2 ">
                                    <scale-tooltip content={t('PLANS.TOOLTIP_OTC')}>
                                        <scale-tag style={{ '--background': 'var(--telekom-color-primary-standard)', '--color': 'white' , position: 'relative', top: '-3px' }}>
                                            {t('PLANS.OTC')}
                                        </scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_AZURE')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.AZURE')}</scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_GCP')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.GCP')}</scale-tag>
                                    </scale-tooltip>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <scale-tag style={{ '--background': '#4dd1e0', '--color': 'black', position: 'relative', top: '-3px' }}>
                                    {t('PLANS.STANDARD_2000')}
                                </scale-tag>
                            </td>
                            <td><b>{t('PLANS.COST_2000')}</b></td>
                            <td>{t('PLANS.TOKEN_PRICE_2000')}</td>
                            <td>300</td>
                            <td>
                                <div className="my-row my-gap-2">
                                    <scale-tooltip content={t('PLANS.TOOLTIP_OTC')}>
                                        <scale-tag style={{ '--background': 'var(--telekom-color-primary-standard)', '--color': 'white' , position: 'relative', top: '-3px' }}>
                                            {t('PLANS.OTC')}
                                        </scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_AZURE')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.AZURE')}</scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_GCP')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.GCP')}</scale-tag>
                                    </scale-tooltip>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <scale-tag style={{ '--background': '#5ec2ed', '--color': 'black' }}>
                                    {t('PLANS.STANDARD_3000')}
                                </scale-tag>
                            </td>
                            <td><b>{t('PLANS.COST_3000')}</b></td>
                            <td>{t('PLANS.TOKEN_PRICE_3000')}</td>
                            <td>450</td>
                            <td>
                                <div className="my-row my-gap-2">
                                    <scale-tooltip content={t('PLANS.TOOLTIP_OTC')}>
                                        <scale-tag style={{ '--background': 'var(--telekom-color-primary-standard)', '--color': 'white' , position: 'relative', top: '-3px' }}>
                                            {t('PLANS.OTC')}
                                        </scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_AZURE')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.AZURE')}</scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_GCP')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.GCP')}</scale-tag>
                                    </scale-tooltip>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <scale-tag style={{ '--background': '#84b0f5', '--color': 'black' }}>
                                    {t('PLANS.STANDARD_4000')}
                                </scale-tag>
                            </td>
                            <td><b>{t('PLANS.COST_4000')}</b></td>
                            <td>{t('PLANS.TOKEN_PRICE_4000')}</td>
                            <td>600</td>
                            <td>
                                <div className="my-row my-gap-2">
                                    <scale-tooltip content={t('PLANS.TOOLTIP_OTC')}>
                                        <scale-tag style={{ '--background': 'var(--telekom-color-primary-standard)', '--color': 'white' , position: 'relative', top: '-3px' }}>
                                            {t('PLANS.OTC')}
                                        </scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_AZURE')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.AZURE')}</scale-tag>
                                    </scale-tooltip>
                                    <scale-tooltip content={t('PLANS.TOOLTIP_GCP')}>
                                        <scale-tag style={{ position: 'relative', top: '-3px' }}> {t('PLANS.GCP')}</scale-tag>
                                    </scale-tooltip>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </scale-table>
                <span className="scl-font-variant-caption my-pmy-4">* OTC-Hosted Large Language Models</span>
            </div>
        </div>
    );
}
