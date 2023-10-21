function deepValueSearch(obj, predicate) {
  const paths = [];
  const executions = [];
  const visited = new Set(); // use a Set instead of an array for faster lookups
  const helper = (currentPath, currentObj) => {
    if (predicate(currentObj)) {
      paths.push(currentPath);
      return;
    }
    if (visited.has(currentObj)) {
      // use Set's has method instead of includes for faster lookups
      return;
    }
    visited.add(currentObj);
    if (Array.isArray(currentObj)) {
      for (let i = 0; i < currentObj.length; i++) {
        executions.push(() => helper(`${currentPath}/${i}`, currentObj[i]));
      }
    }
    if (typeof currentObj === "object" && currentObj !== null) {
      for (let [k, v] of Object.entries(currentObj)) {
        executions.push(() => helper(`${currentPath}/${k}`, v));
      }
    }
  };

  helper("", obj);
  executions.forEach((e) => e()); // use forEach instead of for loop for cleaner code
  paths.forEach((path) => console.log(path)); // use forEach instead of for loop for cleaner code
}
