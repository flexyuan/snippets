function deepValueSearch(obj, value) {
  const paths = [];
  const executions = [];
  const visited = [];
  const helper = (currentPath, currentObj) => {

    if (currentObj === value) {
      paths.push(currentPath);
      return;
    }
    if (visited.includes(currentObj)) {
      return;
    }
    visited.push(currentObj);
    if (Array.isArray(currentObj)) {
      for (let i = 0; i < currentObj.length; i++) {
        executions.push(() => helper(`${currentPath}/${i}`, currentObj[i]));
      }
    }
    if (typeof currentObj === 'object' && currentObj !== null) {
      for (let [k, v] of Object.entries(currentObj)) {
        executions.push(() => helper(`${currentPath}/${k}`, v));
      }
    }
  }
 
  helper("", obj)
  for (let e of executions) {
    e();
  }
  for (let path of paths) {
    console.log(path)
  }
}
