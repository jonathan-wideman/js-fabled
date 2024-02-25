export const nextPage = (page) => {
  const pageNumber = getPageNumber(page)
  return pageNumber ? `${pageNumber + 1}` : undefined
}

export const prevPage = (page) => {
  const pageNumber = getPageNumber(page)
  return pageNumber ? `${Math.max(pageNumber - 1, 1)}` : undefined
}

export const getPageNumber = (page) => {
  const pageNumber = parseInt(page)
  return isNaN(pageNumber) ? undefined : pageNumber
}

export const elementToItem = (e) => {
  const ignoreAttributes = [
    // TODO: ignore other attributes
    'profession'
  ]
  // lowercase, since this isn't necessarily xml
  let type = e?.tagName?.toLowerCase()
  // exception for uk english
  if (type == 'armour') { type = 'armor' }
  let item = { ...Object.fromEntries(Array.from(e?.attributes).map(a => [a.name, a.value]).filter(a => !ignoreAttributes.includes(a[0]))), type }
  // convert any properties that should be numbers
  // TODO: other properties
  item = {
    ...item,
    bonus: parseInt(item.bonus) || undefined
  }
  return item
}

export const elementToStartingAbilities = (e) => {
  const abilities = e?.textContent?.split(' ').map(a => parseInt(a) || 0)
  return abilities
}

export const calculateStat = (character, statName) => {
  // TODO: also return the calculation details for the stat
  let item = undefined
  let details = []
  switch (statName) {
    case 'defense':
      // TODO: rank + armor + combat + any current buffs/debuffs
      // TODO: surface the sub-details
      // TODO: we don't use calculateStat('armor')
      item = getEquippedItem(character, 'armor')
      details = [
        // { label: 'rank', value: character.rank.value },
        { label: 'rank', value: character.rank },
        { label: item?.name ?? 'no armor', value: item?.bonus ?? 0 },
        // { label: 'armor', value: calculateStat(character, 'armor').value },
        { label: 'combat', value: calculateStat(character, 'combat').value },
      ]
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'armor':
      // TODO: equipped armor bonus + any current buffs/debuffs
      item = getEquippedItem(character, 'armor')
      details = [
        { label: item?.name ?? 'no armor', value: item?.bonus ?? 0 }
      ]
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'combat':
      // TODO: base stat + equipped weapon bonus + any current buffs/debuffs
      item = getEquippedItem(character, 'weapon')
      details = [
        { label: 'ability', value: character.combat },
        { label: item?.name ?? 'no weapon', value: item?.bonus ?? 0 }
      ]
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'charisma':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'charisma')
      details = [
        { label: 'ability', value: character.charisma },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'combat':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'combat')
      details = [
        { label: 'ability', value: character.combat },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'magic':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'magic')
      details = [
        { label: 'ability', value: character.magic },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'sanctity':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'sanctity')
      details = [
        { label: 'ability', value: character.sanctity },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'scouting':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'scouting')
      details = [
        { label: 'ability', value: character.scouting },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    case 'thievery':
      // TODO: base stat + tool bonus + any current buffs/debuffs
      item = getBestItem(character, 'thievery')
      details = [
        { label: 'ability', value: character.thievery },
      ]
      if (item) { details.push({ label: item.name, value: item.bonus }) }
      return { value: details.reduce((sum, detail) => sum += detail.value, 0), details }
    default:
      return { value: 0, details: [] }
  }
}

export const getEquippedItem = (character, type) => {
  // assume we can only have one equipped item of each type
  const item = character.inventory.items.find(item => item.type === type && item.equipped)
  return item
}

export const getBestItem = (character, ability) => {
  // find all the tools with a bonus for this ability
  const items = character.inventory.items.filter(item => item.type === 'tool' && item.ability === ability && item.bonus)
  // if we don't have any, return
  if (items.length == 0) { return }
  // find the tool with the largest bonus
  const item = items.reduce((prev, current) => (prev.bonus > current.bonus) ? prev : current)
  // an item with no bonus or a negative bonus is not better than nothing
  if (item.bonus <= 0) { return }
  // finally, return the best item
  return item
}

export const getRankTitle = (rank) => [
  'Outcast',
  'Commoner',
  'Guildmember',
  'Master/Mistress',
  'Gentleman/Lady',
  'Baron/Baroness',
  'Count/Countess',
  'Earl/Viscountess',
  'Marquis/Marchioness',
  'Duke/Duchess',
  'Hero/Heroine',
]?.[rank - 1]


export const formatModifier = (value) => value > 0 ? `+${value}` : `${value}`

export const isEquipment = (item) => ['weapon', 'armor'].includes(item.type)

export const bookFromNumber = (number) => number ? `book${number}` : undefined
export const sectionCodeword = (book, page) => `${book.replace('book', '')}.${page}`
export const sectionTickCodeword = (book, page, n) => `${book.replace('book', '')}.${page}[${n}]`






export const conditionalElements = (condition, ...elements) => condition ? elements : []

export const range = (n) => [...Array(n)]




// TODO: read from server
export const bookMetadata = {
  book1: { title: 'The War-Torn Kingdom' },
  book2: { title: 'Cities of Gold and Glory' },
  book3: { title: 'Over the Blood-Dark Sea' },
  book4: { title: 'Devils & Howling Darkness' },
  book5: { title: 'The Court of Hidden Faces' },
  book6: { title: 'Lords of the Rising Sun' },
  book7: { title: 'The Serpent-King\u2019s Domain' },
  book8: { title: 'The Lone and Level Sands' },
  book9: { title: 'The Isle of a Thousand Spires' },
  book10: { title: 'Legions of the Labyrinth' },
  book11: { title: 'The City in the Clouds' },
  book12: { title: 'Into The Underworld' },
}

export const getBookTitle = (book) => bookMetadata[book]?.title