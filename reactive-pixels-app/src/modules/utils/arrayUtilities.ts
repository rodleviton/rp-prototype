export function addItemToArray(
  arrayOfItems: string[],
  itemToAdd: string
): string[] {
  return [...arrayOfItems, itemToAdd];
}

export function removeItemFromArray(
  arrayOfItems: string[],
  itemToRemove: string
): string[] {
  return arrayOfItems.filter((item: string) => item !== itemToRemove);
}
