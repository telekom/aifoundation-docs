
import React, { useState } from 'react';
import RatePlans from './RatePlans';
import ModelPlans from './ModelPlans';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import '@telekom/scale-components-react';

function PlansPage({ selectedPlanId = '' }) {
    const [internalSelectedPlanId, setInternalSelectedPlanId] = useState(selectedPlanId);

    return (
        <div className="my-column my-mx-2" id="plans-page">
            {!selectedPlanId && <RatePlans selectedPlanId={selectedPlanId} />}

            <div className="my-mt-1">
                <ModelPlans
                    onSelectedPlanId={(id) => setInternalSelectedPlanId(id)}
                    selectedPlanId={selectedPlanId}
                />
            </div>
        </div>
    );
}

export default PlansPage;
