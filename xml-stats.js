// Read xml files in book folders to determine how many and what tags are present.
// Pass any books to inspect as subsequent command line arguments, eg.
// `node xml-stats book1 book2 book3`


// TODO: investigate why it's not reading some tags, eg. `node xml-stats book2` shows the following:
// ...
// include: 1
// exclude: 1
// ...
// except there are clearly two instances of each in the same file that to have appear identical text in regards to parsing tags


const fs = require("node:fs").promises
// const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
// "fast-xml-parser": "^4.3.4",

// const xmlParser = new XMLParser({
// ignoreAttributes: false,
// attributeNamePrefix: "@_",
// preserveOrder: true,
// })
// let jObj = xmlParser.parse(XMLdata);

const CLI_COLOR_GREEN = '\x1b[32m'
const CLI_COLOR_YELLOW = '\x1b[33m'
const CLI_COLOR_CYAN = '\x1b[36m'
const CLI_COLOR_WHITE = '\x1b[37m'

const tagWholeRegex = /<[^(><)]+?>/g
const tagIdRegex = /<\/?(\w+)[\/ >]/g

function countTags(text) {
  // select whole tags
  const tags = [...text.matchAll(tagWholeRegex)].flatMap(match => match[0])
  // console.log("TAGS:", tags)

  // filter out
  // - xml header tag
  // - closing tags
  // - comment tags
  const openingTags = tags.filter(tag => !tag.startsWith('<?') && !tag.startsWith('</') && !tag.startsWith('<!'))
  // console.log("OPENING TAGS:", openingTags)

  let tagIds = []
  tagIds = openingTags.map(tag => {
    try {
      return [...tag.matchAll(tagIdRegex)][0][1]
    } catch (error) {
      throw new Error(`Error parsing tag id trom tag ${tag}`)
    }
  })

  // count tags:
  let tagCounts = {}
  for (const tagId of tagIds) {
    tagCounts[tagId] = (tagCounts[tagId] ?? 0) + 1
  }

  return tagCounts
}

// const bookName = 'book2'
const bookName = process.argv[2]
const bookNames = process.argv.filter((argv, index) => index > 1)

async function parseBook(bookName) {
  const path = `public/books/${bookName}`

  // Find all the xml file paths for a book
  console.log(`Parsing XML files in ${CLI_COLOR_CYAN}${path}${CLI_COLOR_WHITE}...`)
  let xmlPaths = []
  try {
    xmlPaths = (await fs.readdir(path))
      .filter(filename => filename.endsWith(".xml"))
      .map(filename => `${path}/${filename}`);
  } catch (error) {
    console.error(error)
    return {}
  }

  // process all files simultaneously
  const fileData = await Promise.all(xmlPaths.map(
    path => {
      return fs.readFile(path, 'utf8', (err, text) => {
        if (err) {
          console.error(err);
          return {};
        }
        return text
        // at this point text is the file string
      }).then(text => {
        try {
          return countTags(text)
        } catch (error) {
          console.error("Error parsing file", path)
          console.error(error.message)
          return {}
        }
      });
    }
  ))

  // sum up all the counts
  let tagCounts = {}
  for (const count of fileData) {
    for (const tag in count) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }

  return tagCounts
}


async function main() {

  // const tagCounts = await parseBook(bookName)
  const tagCountsList = await Promise.all(bookNames.map(bookName => parseBook(bookName)))

  // sum up all the counts
  let tagCounts = {}
  for (const count of tagCountsList) {
    for (const tag in count) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + count[tag]
    }
  }

  // sort tag counts descending
  console.log('XML tag counts:')
  const sortedTagCounts = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  for (const [tag, count] of sortedTagCounts) {
    console.log(`${CLI_COLOR_GREEN}${tag}${CLI_COLOR_WHITE}: ${CLI_COLOR_YELLOW}${count}`)
  }
}

main()