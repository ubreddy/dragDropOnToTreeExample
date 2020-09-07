/*
  Checking if two given path are equal
  paths are two arrays of index numbers.
 */
export const isSamePath = (a, b) => {
  if (a === b) {
    return true;
  }
  return a.length === b.length && a.every((v, i) => v === b[i]);
};
/*
  Checks if the two paths have the same parent
 */
export const hasSameParent = (a, b) => isSamePath(getParentPath(a), getParentPath(b));
/*
  Calculates the parent path for a path
*/
export const getParentPath = (child) => child.slice(0, child.length - 1);
/*
  It checks if the item is on top of a sub tree based on the two neighboring items, which are above or below the item.
*/
export const isTopOfSubtree = (belowPath, abovePath) => !abovePath || isParentOf(abovePath, belowPath);
const isParentOf = (parent, child) => isSamePath(parent, getParentPath(child));
export const getIndexAmongSiblings = (path) => {
  const lastIndex = path[path.length - 1];
  return lastIndex;
};
export const getPathOnLevel = (path, level) => path.slice(0, level);

/** if not moved within same subtree then add one more to the lastIndex in path indicating it is added ...  */
export const moveAfterPath = (after, from) => {
  const newPath = [...after];
  const movedDownOnTheSameLevel = from && isLowerSibling(newPath, from);
  if (!movedDownOnTheSameLevel) {
    // not moved within the same subtree
    newPath[newPath.length - 1] += 1;
  }
  return newPath;
};
// is a lower than other in order within same parent?
export const isLowerSibling = (a, other) => hasSameParent(a, other) &&
  getIndexAmongSiblings(a) > getIndexAmongSiblings(other);
