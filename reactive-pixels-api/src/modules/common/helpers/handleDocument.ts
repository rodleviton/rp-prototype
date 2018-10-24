/**
 * Assigns document id to document
 * @param doc
 */
export function handleDocument(doc: any | any) {
  return Object.assign({}, doc.data(), { id: doc.id });
}
