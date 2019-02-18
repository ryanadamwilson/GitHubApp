export default function sortMap (a, b, sortOption) {
  const explode = sortOption.split(':');
  if (explode[0] === 'comments') {
    if (explode[1] === "desc") {
      return b.comments - a.comments;
    }
    return a.comments - b.comments;
  }
  let aValue = a[`${explode[0]}_at`];
  let bValue = b[`${explode[0]}_at`];
  if (explode[1] === 'desc') {
    if (aValue > bValue) {
      return -1;
    }
    if (aValue < bValue) {
      return 1;
    }
    return 0;
  }
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
}
