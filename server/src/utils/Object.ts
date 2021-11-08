export function destructObject(object: any): object {
  let obj = {};
  for (let key in object) {
    if (typeof object[key] === 'object') obj = { ...obj, ...destructObject(object[key]) };
    else obj = { ...obj, [key]: object[key] };
  }
  return obj;
}
