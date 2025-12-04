import {AllPlansV1_19_0} from "./v1.19.0";

export const PlansHistory = AllPlansV1_19_0


/**
 * Instructions to Update or Add Models and Pricing on the Plans Page:
 *
 * 1. To Maintain the history of plans configuration, please create a new folder with version number in the same folder (PlansModelData).
 * 2. Go to AIFS Serving UI and export the Rate plans from Plans page. The Application will download a JSON file with all the plans and there model with pricing.
 * 3. Add that file in your newly created folder.
 * 4. Import that file in index.js in same folder to make it accessible in application.
 * 5. Now update this file to access newly created file export variable.

 * Please follow these steps carefully to ensure the Plans are updated correctly.
 */