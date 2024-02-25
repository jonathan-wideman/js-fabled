const tagWholeRegex = /<[^(><)]+?>/g
const tagIdRegex = /<\/?(\w+)[\/ >]/g

export function matchTags(text) {
  // select whole tags
  const tags = [...text.matchAll(tagWholeRegex)].flatMap(match => match[0])
  console.log("TAGS:", tags)
  
  // filter out closing tags
  const openingTags = tags.filter(tag => !tag.startsWith('</'))
  console.log("OPENING TAGS:", openingTags)

  const tagIds = openingTags.map(tag => [...tag.matchAll(tagIdRegex)][0][1])
  console.log("TAG IDS:", tagIds)

  // count tags:
  let tagCounts = {}
  for (const tagId of tagIds) {
    tagCounts[tagId] = (tagCounts[tagId] ?? 0) + 1
  }
  
  return tagCounts
}

export function formatXML(text) {
  return JSON.stringify(matchTags(text), null, 2)
}