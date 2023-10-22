function deepClone(obj, clonedObjects = new Map()) {
    if (obj === null || typeof obj !== 'object') {
        // If obj is not an object or is null, return it as is
        return obj;
    }

    // If the object has already been cloned, return the clone
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    // Create a new object or array to hold the cloned properties
    const clone = Array.isArray(obj) ? [] : {};

    // Add the clone to the cloned objects map
    clonedObjects.set(obj, clone);

    // Recursively clone each property of the original object or array
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key], clonedObjects);
        }
    }

    // Copy over any functions from the original object or array
    const originalFunctions = Object.getOwnPropertyNames(obj)
        .filter(prop => typeof obj[prop] === 'function');
    for (const funcName of originalFunctions) {
        clone[funcName] = obj[funcName];
    }

    return clone;
}
