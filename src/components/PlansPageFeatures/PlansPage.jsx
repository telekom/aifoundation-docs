import React, { useState } from 'react';
import '../../i18n';
import RatePlans  from './RatePlans';
import ModelPlans from './ModelPlans';

function PlansPage() {
    const [selectedPlanId, setSelectedPlanId] = useState('');

    return (
        <div className="my-column my-mx-2" id="plans-page">
            <RatePlans />
            <div className="my-mt-1">
                <ModelPlans onSelectedPlanId={(id) => setSelectedPlanId(id)} />
            </div>
        </div>
    );
}

export default PlansPage;
