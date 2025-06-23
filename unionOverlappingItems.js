/**
 * Merges all overlapping ranges in an array and returns a new array of non-overlapping items.
 *
 * Example:
 *   Input:  [{ startPx: 10, endPx: 30 }, { startPx: 20, endPx: 40 }]
 *   Output: [{ startPx: 10, endPx: 40 }]
 *
 * @param items Array of range objects
 * @returns Merged array with non-overlapping items
 */
export const unionOverlappingItems = (items) => {
  // Check for valid array input
  if (!Array.isArray(items)) return [];

  // Filter valid ranges only
  const validItems = items.filter(
    (item) =>
      typeof item?.startPx === "number" &&
      typeof item?.endPx === "number" &&
      item.startPx <= item.endPx
  );

  // Return if there are fewer than 2 valid items
  if (validItems.length < 2) return validItems;

  // Sort by startPx
  validItems.sort((a, b) => a.startPx - b.startPx);

  // Check if any overlap exists -> Early exit optimization
  let hasOverlap = false;
  for (let i = 1; i < validItems.length; i++) {
    if (validItems[i].startPx <= validItems[i - 1].endPx) {
      hasOverlap = true;
      break;
    }
  }
  if (!hasOverlap) return validItems;

  // Merge overlapping items
  const result = [validItems[0]];
  for (let i = 1; i < validItems.length; i++) {
    const current = validItems[i];
    const last = result[result.length - 1];

    if (current.startPx <= last.endPx) {
      last.endPx = Math.max(last.endPx, current.endPx);
    } else {
      result.push(current);
    }
  }

  return result;
};
