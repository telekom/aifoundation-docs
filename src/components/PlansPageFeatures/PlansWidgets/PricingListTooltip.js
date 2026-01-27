import React, { useEffect, useRef, useState } from 'react';
import { formatNumberEuropean } from '../../../shared/lib';
import useMyI18n from '../../../shared/lib/useMyI18n';

function PricingListTooltip(props) {
    const { exactModelName = '', pricingName = '', allStandardPackages = [] } = props || {};
    const { t } = useMyI18n();

    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);

    const [modelList, setModelList] = useState([
        { packageName: 'Tarif Basic Template', label: 'Basic', color: '#4de0af', price: '' },
        { packageName: 'Tarif Standard1000 Template', label: 'Standard 1000', color: '#4ad9cd', price: '' },
        { packageName: 'Tarif Standard2000 Template', label: 'Standard 2000', color: '#4dd1e0', price: '' },
        { packageName: 'Tarif Standard3000 Template', label: 'Standard 3000', color: '#5ec2ed', price: '' },
        { packageName: 'Tarif Standard4000 Template', label: 'Standard 4000', color: '#84b0f5', price: '' },
    ]);

    function closeModal() {
        setModal(false);
    }
    function openModal() {
        setModal(true);
    }

    // attach listener for the custom 'scale-close' event emitted by the web component
    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;
        function handler(ev) {
            // prevent default-like behaviour if available
            ev && ev.preventDefault && ev.preventDefault();
            ev && ev.stopPropagation && ev.stopPropagation();
            closeModal();
        }
        el.addEventListener('scale-close', handler);
        return () => el.removeEventListener('scale-close', handler);
    }, []);

    useEffect(() => {
        // reset prices
        setModelList((prev) => prev.map((m) => ({ ...m, price: '' })));

        (allStandardPackages || []).forEach((plan) => {
            const matchingModel = plan.modelQuotaConfigs?.find((model) => model.displayModelName === exactModelName);
            if (matchingModel && plan.packageName) {
                setModelList((prev) =>
                    prev.map((item) => {
                        if (item.packageName !== plan.packageName) return item;
                        const priceValue =
                            pricingName === (t('PLANS.INPUT_TOKEN_PRICE') || 'Input Token Price')
                                ? matchingModel.inputPricePerMillionTokens
                                : matchingModel.outputPricePerMillionTokens;
                        return { ...item, price: priceValue != null ? String(priceValue) : '' };
                    })
                );
            }
        });
        // run when packages, exactModelName or pricingName change
    }, [allStandardPackages, exactModelName, pricingName, t]);

    const openItemRef = useRef(null);

    useEffect(() => {
        const el = openItemRef.current;
        if (!el) return;

        function handleClick() {
            openModal();
        }

        el.addEventListener('click', handleClick);

        return () => el.removeEventListener('click', handleClick);
    }, []);
    return (
        <div>
            <scale-menu-flyout>
                <div slot="trigger" className="my-row my-justify-center my-align-center">
                    <scale-tooltip content={'Compare pricing'}>
                        <scale-icon-action-compare size="18" accessibility-title="compare" />
                    </scale-tooltip>
                </div>

                <scale-menu-flyout-list>
                    <div className="my-column my-justify-center my-align-center my-width-2 my-mb-4">
                        <b>{exactModelName}</b>
                        <b>{pricingName}</b>
                        <span className="scl-font-variant-label">€ / Mio. Tokens</span>
                    </div>

                    {modelList.map((item) => (
                        <scale-menu-flyout-item key={item.packageName}>
                            <div className="my-row my-justify-space-between">
                                <scale-tag style={{ "--background": item.color, "--color": "black" }}>
                                    {item.label}
                                </scale-tag>

                                <b>{item.price !== '' ? '€ ' + formatNumberEuropean(Number(item.price)) : 'Not Included'}</b>
                            </div>
                        </scale-menu-flyout-item>
                    ))}

                    <scale-menu-flyout-item ref={openItemRef}>
                        <b className="my-row my-justify-center magenta-color-text">
                            {'How many tokens do I need?'}
                        </b>
                    </scale-menu-flyout-item>
                </scale-menu-flyout-list>
            </scale-menu-flyout>

            <scale-modal
                ref={modalRef}
                opened={modal}
                heading={'How many Tokens do I need?'}
                styles=".modal__body-wrapper {display: flex; flex-direction: column;} .modal__body {display: flex !important; overflow: hidden;}"
            >
                <div className="my-column my-flex my-overflow my-my-4 my-gap-4">
                    <div className="border">
                        <div className="my-column my-justify-center my-align-center my-py-4 border-bottom scl-font-variant-heading-5">
                            Writing Tasks
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <b>Email response</b>
                                </td>
                                <td>50-200 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Blog Posts</b>
                                </td>
                                <td>500-2,000 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Product Description</b>
                                </td>
                                <td>500-2,000 tokens</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border">
                        <div className="my-column my-justify-center my-align-center my-py-4 border-bottom scl-font-variant-heading-5">
                            Coding Tasks
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <b>Debugging Help</b>
                                </td>
                                <td>200-1,000 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Code Review</b>
                                </td>
                                <td>500-2,000 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Documentation</b>
                                </td>
                                <td>800-3,000 tokens</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border">
                        <div className="my-column my-justify-center my-align-center my-py-4 border-bottom scl-font-variant-heading-5">
                            Research & Analysis
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <b>Document Summary</b>
                                </td>
                                <td>200-800 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Meeting Transcript Analysis</b>
                                </td>
                                <td>800-2,500 tokens</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Contract/Document Comparison</b>
                                </td>
                                <td>1,000-5,000 tokens</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <scale-button slot="action" variant="secondary" onClick={closeModal}>
                    Close
                </scale-button>
            </scale-modal>

            <style jsx>{`
                scale-menu-flyout-item::part(base) {
                    outline: none;
                    border-top: 1px solid var(--telekom-color-ui-faint);
                }
                scale-menu-flyout-item::part(base):hover {
                    background: var(--telekom-color-background-surface-subtle);
                }
                .border {
                    border: 1px solid var(--telekom-color-ui-faint);
                    border-radius: 12px;
                }
                .border-bottom {
                    border-bottom: 1px solid var(--telekom-color-ui-faint);
                }
                .table tbody td {
                    padding-left: var(--telekom-spacing-unit-x5);
                }
                scale-tooltip::part(trigger) {
                    position: relative;
                    top: 4px;
                }
            `}</style>
        </div>
    );
}

export default PricingListTooltip;
