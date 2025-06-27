export const validations = (
  data,
  ruleName,
  isUpdate = false,
  existingEntries
) => {
  const errors = [];

  // Safe string conversion helper
  const safe = (val) => String(val ?? "").trim();

  // Regex definitions
  const alpha = /^[A-Za-z\s]+$/; //“ must contain only letters”
  const alphanum = /^[A-Za-z0-9\s]+$/; //“ must contain only letters, numbers, and spaces”
  const digitsOnly = /^[0-9]+$/; //must contain digits only
  const floatNumber = /^\d+(\.\d{1,2})?$/; // must contain a float number with max 2 decimal places

  //service order type validation
  if (ruleName === "serviceordertypes") {
    if (!data.SO_TYPE_ID?.trim()) {
      errors.push("Tariff ID is required");
    } else if (!digitsOnly.test(data.TARIFF_ID)) {
      errors.push("Tariff ID must contain digits only");
    }

    if (!data.PRODUCT?.trim()) {
      errors.push("Product is required");
    } else if (!alphanum.test(data.PRODUCT)) {
      errors.push("Product must contain only letters, numbers, and spaces");
    }

  

    if (!data.SERVICE_TYPE?.trim()) {
      errors.push("Service Type is required");
    } else if (!alpha.test(data.SERVICE_TYPE)) {
      errors.push("Service Type must contain only letters");
    }

    if (!data.ORDER_TYPE?.trim()) {
      errors.push("Order Type is required");
    } else if (!alpha.test(data.ORDER_TYPE)) {
      errors.push("Order Type must contain only letters");
    }

    if (isUpdate) {
      if (!data.UPDATED_USER?.trim()) {
        errors.push("Updated user is required");
      } else if (!alpha.test(data.UPDATED_USER)) {
        errors.push("Updated user must contain only letters");
      }
    } else {
      if (!data.CREATED_USER?.trim()) {
        errors.push("Created user is required");
      } else if (!alpha.test(data.CREATED_USER)) {
        errors.push("Created user must contain only letters");
      }
    }
    // Duplicate check (only during creation)
    if (existingEntries) {
      const duplicate = existingEntries.some(
        (item) => item.SO_TYPE_ID === data.SO_TYPE_ID
      );

      if (duplicate) {
        errors.push("This Product with the same types ID already exists.");
      }
    }

    return errors;
  }

  // slab demarcation validation
  if (ruleName === "slabdemarcation") {
    if (!data.SLAB_ID?.trim()) {
      errors.push("SLAB ID is required");
    } else if (!digitsOnly.test(data.SLAB_ID)) {
      errors.push("SLAB ID must contain digits only");
    }

    if (!data.SLAB_LEVEL?.trim()) {
      errors.push("Slab level is required");
    } else if (!digitsOnly.test(data.SLAB_LEVEL)) {
      errors.push("Slab level must contain only numbers");
    }

    if (!data.UPPER_RANGE?.trim()) {
      errors.push("Upper Range is required");
    } else if (!floatNumber.test(data.UPPER_RANGE)) {
      errors.push("Upper Range must contain only numbers");
    }

    if (!data.LOWER_RANGE?.trim()) {
      errors.push("Lower Range is required");
    } else if (!floatNumber.test(data.LOWER_RANGE)) {
      errors.push("Lower Range must contain only numbers");
    }

    if (isUpdate) {
      if (!data.UPDATED_USER?.trim()) {
        errors.push("Updated user is required");
      } else if (!alpha.test(data.UPDATED_USER)) {
        errors.push("Updated user must contain only letters");
      }
    } else {
      if (!data.CREATED_USER?.trim()) {
        errors.push("Created user is required");
      } else if (!alpha.test(data.CREATED_USER)) {
        errors.push("Created user must contain only letters");
      }
    }
    // Duplicate check (only during creation)
    if (existingEntries) {
      const duplicate = existingEntries.some(
        (item) => item.SLAB_ID === data.SLAB_ID
      );

      if (duplicate) {
        errors.push("This SLAB with the same SLAB ID already exists.");
      }
    }

    return errors;
  }
  // blacklist package validations
  if (ruleName === "blacklistpackage") {
    if (!safe(data.BLP_ID)) {
      errors.push("BLP ID is required");
    } else if (!digitsOnly.test(safe(data.BLP_ID))) {
      errors.push("BLP ID must contain digits only");
    }

    if (!safe(data.TARIFF_ID)) {
      errors.push("tariff is required");
    } else if (!digitsOnly.test(safe(data.TARIFF_ID))) {
      errors.push("tariff ID must contain only numbers");
    }

    if (!safe(data.PACKAGE_NAME)) {
      errors.push("package name is required");
    } else if (!alphanum.test(safe(data.PACKAGE_NAME))) {
      errors.push("package name must be in letters");
    }

    if (isUpdate) {
      if (!safe(data.UPDATED_USER)) {
        errors.push("Updated user is required");
      } else if (!alpha.test(safe(data.UPDATED_USER))) {
        errors.push("Updated user must contain only letters");
      }
    } else {
      if (!safe(data.CREATED_USER)) {
        errors.push("Created user is required");
      } else if (!alpha.test(safe(data.CREATED_USER))) {
        errors.push("Created user must contain only letters");
      }
    }

    // Duplicate check only during creation
    if (!isUpdate && existingEntries) {
      const duplicate = existingEntries.some(
        (item) => String(item.BLP_ID).trim() === safe(data.BLP_ID)
      );
      if (duplicate) {
        errors.push("Blacklist package with the same Blacklist package id already exists.");
      }
    }

    return errors;
  }

  //bearer rates validation
  if (ruleName === "bearerrates") {
    if (!data.BEARER_RATES_ID?.toString().trim()) {
      errors.push("Bearer rates ID is required");
    } else if (!digitsOnly.test(data.BEARER_RATES_ID)) {
      errors.push("bearer rates must contain digits only");
    }

     if (!data.SERVICE_TYPE?.trim()) {
      errors.push("Service Type is required");
    } else if (!alpha.test(data.SERVICE_TYPE)) {
      errors.push("Service Type must contain only letters");
    }

    if (!data.ORDER_TYPE?.trim()) {
      errors.push("Order Type is required");
    } else if (!alpha.test(data.ORDER_TYPE)) {
      errors.push("Order Type must contain only letters");
    }

    if (!data.COMPILANCE?.toString().trim()) {
      errors.push("Compilance is required");
    } else if (!alpha.test(data.COMPILANCE)) {
      errors.push("compilance must contain only letters and spaces");
    }

     if (!data.RATES_UNDER_SLAB_LEVELS?.toString().trim()) {
      errors.push("Compilance is required");
    } else if (!alpha.test(data.RATES_UNDER_SLAB_LEVELS)) {
      errors.push("compilance must contain only letters and spaces");
    }

    if (isUpdate) {
      if (!data.UPDATED_USER?.toString().trim()) {
        errors.push("Updated user is required");
      } else if (!alpha.test(data.UPDATED_USER)) {
        errors.push("Updated user must contain only letters");
      }
    } else {
      if (!data.CREATED_USER?.toString().trim()) {
        errors.push("Created user is required");
      } else if (!alpha.test(data.CREATED_USER)) {
        errors.push("Created user must contain only letters");
      }
    }

    // Duplicate check (only during creation)
    if (!isUpdate && existingEntries) {
      const duplicate = existingEntries.some(
        (item) => item.BEARER_RATES_ID === data.BEARER_RATES_ID
      );
      if (duplicate) {
        errors.push("This package with the same Bearer rates ID already exists.");
      }
    }

    return errors;
  }

  // package rates validations
  if (ruleName === "packageRates") {
    if (!data.PACKAGE_RATE_ID?.trim()) {
      errors.push("Pakage rates ID is required");
    } else if (!digitsOnly.test(data.PACKAGE_RATE_ID)) {
      errors.push("Package rates ID must contain digits only");
    }

    if (!data.TARIFF_ID?.trim()) {
      errors.push("Tariff ID is required");
    } else if (!digitsOnly.test(data.TARIFF_ID)) {
      errors.push("Tariff ID must contain digits only");
    }

    if (!data.PACKAGE?.trim()) {
      errors.push("package is required");
    } else if (!alphanum.test(data.PACKAGE)) {
      errors.push("package must contain only letters and numbers");
    }

    if (!data.COMPILANCE?.toString().trim()) {
      errors.push("Compilance is required");
    } else if (!alpha.test(data.COMPILANCE)) {
      errors.push("compilance must contain only letters and spaces");
    }

    if (!data.SLAB_LEVEL_1_RATE?.trim()) {
      errors.push("Slab level 1 rate is required");
    } else if (!alphanum.test(data.SLAB_LEVEL_1_RATE)) {
      errors.push("slab level 1 must contain only letters and numbers");
    }

    if (!data.STAGE_LEVEL_STATUS_CHECK?.trim()) {
      errors.push("stage level status check is required");
    } else if (!alpha.test(data.STAGE_LEVEL_STATUS_CHECK)) {
      errors.push("stage level status check must contain only letters");
    }
if (!data.BASE_RATE?.trim()) {
      errors.push("BASE RATE status check is required");
    } else if (!alpha.test(data.BASE_RATE)) {
      errors.push("BASE RATE status check must contain only letters");
    }

  
    if (isUpdate) {
      if (!data.UPDATED_USER?.trim()) {
        errors.push("Updated User is required");
      } else if (!alpha.test(data.UPDATED_USER)) {
        errors.push("Updated User must contain only letters");
      }
    } else {
      if (!data.CREATED_USER?.trim()) {
        errors.push("Created User is required");
      } else if (!alpha.test(data.CREATED_USER)) {
        errors.push("Created User must contain only letters");
      }
    }

    // Optional duplicate check
    if (!isUpdate && existingEntries) {
      const duplicate = existingEntries.some(
        (item) => item.PACKAGE_RATE_ID === data.PACKAGE_RATE_ID
      );
      if (duplicate) {
        errors.push(
          "A Package rates record with the same Package rate ID already exists."
        );
      }
    }

    return errors;
  }

};