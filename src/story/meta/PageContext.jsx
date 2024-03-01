import { createContext, useContext, useEffect, useState } from "react"

const PageContext = createContext()

export function usePageContext() {
  return useContext(PageContext)
}

// TODO: IDEA
// Can we just use the LevelProvider() eg from react as an identifier?
// Not as-is, I think.
// That would assume we only have one type of thing per tree level
// ie. it assumes we don't have 2 <random> siblings.
// Also, we would still need a way to deal with child nodes modifying parents,
// eg. <random><adjust>

export function PageProvider({ children, page }) {

  const [nextId, setNextId] = useState(0)
  // FIXME: getId is sometimes double-incrementing
  // FIXME: PageProvider doesn't seem to get refreshed when we change pages
  const getId = () => {
    setNextId(prev => prev + 1)
    return nextId
  }

  const [data, setData] = useState({})

  // console.log('render PageProvider')

  const resolveRoll = (id, value) => {
    console.log('resolveRoll', id, value)
    setData(prev => ({...prev, [id]: {type: 'roll', value}}))
  }

  useEffect(() => console.log('data', data), [data])



  return (
    <PageContext.Provider value={{
      getId,
      resolveRoll
    }}>
      {children}
    </PageContext.Provider>
  )
}