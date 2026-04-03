import React from 'react';
import useMyI18n from '../../shared/lib/useMyI18n';

export default function PlansRates() {
    const { t, locale, setLocale } = useMyI18n();

    return (
        <div className="my-column">
            <div className="my-row my-justify-space-between my-align-center my-my-1">
                    <div className="my-row my-align-center my-justify-center font-size-32 font-weight-600">
                        {t('PLANS.TITLE')}
                    </div>
                <div className="my-row my-justify-space-between">
                    <div className="my-input-width-0-5">
                        <label htmlFor="language-select" style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#6c6c6c' }}>
                            {t("LANGUAGE")}
                        </label>
                        <select
                            id="language-select"
                            value={locale}
                            onChange={(e) => setLocale(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                </div>
            </div>
            <span>
                {t('PLANS.SUBTITLE')}
                <br />
                {t('PLANS.SUBTITLE_2')}
            </span>
            <div className="my-column my-my-3">
                <table className="plans-table" style={{
                    border: '1px solid #e0e0e0',
                }}>
                    <thead>
                    <tr>
                        <th>{t('PLANS.TABLE_HEADERS.RATE_PLAN')}</th>
                        <th>{t('PLANS.TABLE_HEADERS.MINIMUM_CONSUMPTION')}</th>
                        <th style={{ lineHeight: '18px', padding: '8px' }}>
                            {t('PLANS.TABLE_HEADERS.TOKEN_PRICING')}
                            <br />
                            <span style={{ fontSize: '12px', color: '#6c6c6c' }}>{t('PLANS.TABLE_HEADERS.PER_MIL_TOKEN')}</span>
                        </th>
                        <th style={{ lineHeight: '18px', padding: '8px' }}>
                            {t('PLANS.TABLE_HEADERS.RPM_EXAMPLE')}
                            <br />
                            <span style={{ fontSize: '12px', color: '#6c6c6c' }}>{t('PLANS.TABLE_HEADERS.PER_REQUEST')}</span>
                        </th>
                        <th>{t('PLANS.TABLE_HEADERS.CLOUD_PROVIDER')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#4de0af', color: 'black' }}>
                                {t('PLANS.BASIC')}
                            </span>
                        </td>
                        <td>-</td>
                        <td>{t('PLANS.TOKEN_PRICE_BASIC')}</td>
                        <td>20</td>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#E20074', color: 'white' }} title={t('PLANS.TOOLTIP_OTC')}>
                                {t('PLANS.OTC')}
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#4ad9cd', color: 'black' }}>
                                {t('PLANS.STANDARD_1000')}
                            </span>
                        </td>
                        <td><b>{t('PLANS.COST_1000')}</b></td>
                        <td>{t('PLANS.TOKEN_PRICE_1000')}</td>
                        <td>150</td>
                        <td>
                            <div className="my-row my-gap-2 ">
                                <span className="plans-tag" style={{ backgroundColor: '#E20074', color: 'white', position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_OTC')}>
                                    {t('PLANS.OTC')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_AZURE')}>
                                    {t('PLANS.AZURE')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_GCP')}>
                                    {t('PLANS.GCP')}
                                </span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#4dd1e0', color: 'black', position: 'relative', top: '-3px' }}>
                                {t('PLANS.STANDARD_2000')}
                            </span>
                        </td>
                        <td><b>{t('PLANS.COST_2000')}</b></td>
                        <td>{t('PLANS.TOKEN_PRICE_2000')}</td>
                        <td>300</td>
                        <td>
                            <div className="my-row my-gap-2">
                                <span className="plans-tag" style={{ backgroundColor: '#E20074', color: 'white', position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_OTC')}>
                                    {t('PLANS.OTC')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_AZURE')}>
                                    {t('PLANS.AZURE')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_GCP')}>
                                    {t('PLANS.GCP')}
                                </span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#5ec2ed', color: 'black' }}>
                                {t('PLANS.STANDARD_3000')}
                            </span>
                        </td>
                        <td><b>{t('PLANS.COST_3000')}</b></td>
                        <td>{t('PLANS.TOKEN_PRICE_3000')}</td>
                        <td>450</td>
                        <td>
                            <div className="my-row my-gap-2">
                                <span className="plans-tag" style={{ backgroundColor: '#E20074', color: 'white', position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_OTC')}>
                                    {t('PLANS.OTC')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_AZURE')}>
                                    {t('PLANS.AZURE')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_GCP')}>
                                    {t('PLANS.GCP')}
                                </span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <span className="plans-tag" style={{ backgroundColor: '#84b0f5', color: 'black' }}>
                                {t('PLANS.STANDARD_4000')}
                            </span>
                        </td>
                        <td><b>{t('PLANS.COST_4000')}</b></td>
                        <td>{t('PLANS.TOKEN_PRICE_4000')}</td>
                        <td>600</td>
                        <td>
                            <div className="my-row my-gap-2">
                                <span className="plans-tag" style={{ backgroundColor: '#E20074', color: 'white', position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_OTC')}>
                                    {t('PLANS.OTC')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_AZURE')}>
                                    {t('PLANS.AZURE')}
                                </span>
                                <span className="plans-tag" style={{ position: 'relative', top: '-3px' }} title={t('PLANS.TOOLTIP_GCP')}>
                                    {t('PLANS.GCP')}
                                </span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <span style={{ fontSize: '12px', color: '#6c6c6c' }} className="my-pmy-4">* OTC-Hosted Large Language Models</span>
            </div>
        </div>
    );
}
