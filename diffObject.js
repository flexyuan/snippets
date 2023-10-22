function diffObjects(oldObj, newObj) {
  const differences = {};

  const pathToString = (path) => path.join(".");
  const pathKey = (path, key) => [...path, key];
  const getPath = (path, key) => pathToString(pathKey(path, key));

  const helper = (oldCurrent, newCurrent, currentPath, visited) => {
    visited.set(oldCurrent, newCurrent);
    for (const key in oldCurrent) {
      if (!newCurrent.hasOwnProperty(key)) {
        differences[getPath(currentPath, key)] = [oldCurrent[key], undefined];
      } else if (oldCurrent[key] !== newCurrent[key]) {
        differences[getPath(currentPath, key)] = [
          oldCurrent[key],
          newCurrent[key],
        ];
      } else if (typeof oldCurrent[key] === "object") {
        if (visited.has(oldCurrent[key])) {
          continue;
        }
        helper(
          oldCurrent[key],
          newCurrent[key],
          pathKey(currentPath, key),
          visited
        );
      }
    }

    for (const key in newCurrent) {
      if (!oldCurrent.hasOwnProperty(key)) {
        differences[getPath(currentPath, key)] = [undefined, newCurrent[key]];
      }
    }
  };

  helper(oldObj, newObj, [], new WeakMap());

  return differences;
}
