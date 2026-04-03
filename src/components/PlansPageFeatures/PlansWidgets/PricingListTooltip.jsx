import React, { useEffect, useState } from 'react';
import { formatNumberEuropean } from '../../../shared/lib';
import useMyI18n from '../../../shared/lib/useMyI18n';

function PricingListTooltip(props) {
    const { exactModelName = '', pricingName = '', allStandardPackages = [] } = props || {};
    const { t } = useMyI18n();

    const [modal, setModal] = useState(false);
    const [flyoutOpen, setFlyoutOpen] = useState(false);

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
        setFlyoutOpen(false);
        setModal(true);
    }

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

    // Close flyout when clicking outside
    useEffect(() => {
        if (!flyoutOpen) return;
        function handleClickOutside(e) {
            const el = e.target.closest('.pricing-tooltip');
            if (!el) setFlyoutOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [flyoutOpen]);

    return (
        <div className="pricing-tooltip" style={{ position: 'relative', display: 'inline-block' }}>
            <div
                className="my-row my-justify-center my-align-center"
                onClick={() => setFlyoutOpen((v) => !v)}
                title="Compare pricing"
                style={{ cursor: 'pointer', position: 'relative', top: '4px' }}
            >
                &#8644;
            </div>

            {flyoutOpen && (
                <div className="pricing-tooltip-content" style={{
                    position: 'absolute',
                    zIndex: 100,
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    minWidth: '260px',
                    padding: '12px 0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '100%',
                    marginTop: '4px',
                }}>
                    <div className="my-column my-justify-center my-align-center my-width-2 my-mb-4" style={{ padding: '0 12px' }}>
                        <b>{exactModelName}</b>
                        <b>{pricingName}</b>
                        <span style={{ fontSize: '11px', color: '#6c6c6c' }}>€ / Mio. Tokens</span>
                    </div>

                    {modelList.map((item) => (
                        <div
                            key={item.packageName}
                            style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', cursor: 'default' }}
                        >
                            <div className="my-row my-justify-space-between">
                                <span className="plans-tag" style={{ backgroundColor: item.color, color: 'black' }}>
                                    {item.label}
                                </span>

                                <b>{item.price !== '' ? '€ ' + formatNumberEuropean(Number(item.price)) : 'Not Included'}</b>
                            </div>
                        </div>
                    ))}

                    <div
                        style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', cursor: 'pointer' }}
                        onClick={openModal}
                    >
                        <b className="my-row my-justify-center magenta-color-text">
                            {'How many tokens do I need?'}
                        </b>
                    </div>
                </div>
            )}

            {modal && (
                <dialog
                    className="plans-dialog"
                    open
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1100,
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '600px',
                        width: '90vw',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ margin: 0 }}>How many Tokens do I need?</h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                            aria-label="close"
                        >
                            &#10005;
                        </button>
                    </div>
                    <div className="my-column my-flex my-overflow my-my-4 my-gap-4">
                        <div className="border">
                            <div className="my-column my-justify-center my-align-center my-py-4 border-bottom" style={{ fontWeight: '600', fontSize: '16px' }}>
                                Writing Tasks
                            </div>
                            <table className="plans-table">
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
                            <div className="my-column my-justify-center my-align-center my-py-4 border-bottom" style={{ fontWeight: '600', fontSize: '16px' }}>
                                Coding Tasks
                            </div>
                            <table className="plans-table">
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
                            <div className="my-column my-justify-center my-align-center my-py-4 border-bottom" style={{ fontWeight: '600', fontSize: '16px' }}>
                                Research & Analysis
                            </div>
                            <table className="plans-table">
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

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button
                            type="button"
                            onClick={closeModal}
                            style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </dialog>
            )}
            {modal && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1099 }}
                    onClick={closeModal}
                />
            )}

            <style>{`
                .border {
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                }
                .border-bottom {
                    border-bottom: 1px solid #e0e0e0;
                }
                .plans-table tbody td {
                    border-bottom: none;
                    width: 50%;
                    padding-left: 20px;
                }
            `}</style>
        </div>
    );
}

export default PricingListTooltip;
