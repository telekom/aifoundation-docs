import React, { useState } from 'react';
import RatePlans  from './RatePlans';
import ModelPlans from './ModelPlans';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';
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
