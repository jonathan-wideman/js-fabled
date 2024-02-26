import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<trade [buy="N"] [cargo="S"] [sell="N"] [ship="S" initialCrew="S" [name="S"]]>
Buy and/or sell a ship or its cargo. This is used within a <market> tag, and is arranged as a table with aligned columns. Using matching <header> and <trade> tags is the responsibility of the writer.

buy – The money required to buy the article. If missing, the article cannot be bought; if any articles can be bought at this market, it will display a '–' instead.

cargo – The type of cargo unit that can be bought and sold.

initialCrew – The crew quality of the ship being bought.

name – The name of the ship being bought.

sell – The money awarded if the article is sold. If missing, the article cannot be sold; if any article can be sold at this market, it will display a '–' instead.

ship – The type of ship that can be bought and sold.

*/

export default function Trade({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='trade'>{children}</DefaultNode>
  )
}