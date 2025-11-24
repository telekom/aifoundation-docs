import {AllPlansV1} from "./v1.13";

export const PlansHistory = AllPlansV1


/**
 * Instructions to Update or Add New Plans on the Plans Page:
 *
 * 1. Create a new folder named by the version (e.g., "v1.11") inside the PlansModelData directory.
 * 2. Add your JSON files for the Plans and Legal document for the latest version into this folder.
 * 3. Create an 'index.js' file in the new version folder to import and export the JSON files.
 *    - Refer to the 'index.js' in the 'v1.13' folder for structure and examples.
 * 4. Once all JSON files are imported and the version is exported from the new folder,
 *    import this version here in this file.
 * 5. Add a new object to the 'PlansHistory' array, including:
 *    - The exported version,
 *    - 'validFrom' date,
 *    - 'documentLink'.
 * 6. Update the 'Current' key in the PlansHistory objects to point to the version currently in use.
 *
 * Please follow these steps carefully to ensure the Plans are updated correctly.
 */