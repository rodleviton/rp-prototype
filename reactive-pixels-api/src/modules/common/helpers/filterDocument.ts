export function filterDocument(doc: any, validKeys: string[]) {
  const clonedDoc = Object.assign({}, doc) // deep merge?
  const docKeys: string[] = Object.keys(clonedDoc)

  docKeys.forEach((key: string) => {
    if (validKeys.indexOf(key) === -1) {
      delete clonedDoc[key]
    }
  })

  return clonedDoc;
}