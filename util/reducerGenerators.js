export function set (actionType, defaultValue) {
  return (state = defaultValue, { data, type }) => {
    return actionType === type ? data : state;
  };
}

export function addToArray (actionType, defaultValue) {
  return (state = defaultValue, { data, type }) => {
    if (actionType === type) {
      let collection = state.concat(data.filter(y => {
        return !state.find(x => x.id === y.id);
      }));
      return collection;
    }
    return state;
  };
}
