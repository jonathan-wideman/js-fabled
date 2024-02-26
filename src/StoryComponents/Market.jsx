import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<market [buy="B"] [currency="S"] [sell="B"]>
Group a set of articles that can be bought or sold into a table. Usually articles are grouped under a matching <header> tag.

buy – whether any articles can be bought at this market; if so, a 'To buy' column will be included.

currency – the currency used at this market, in the singular. Defaults to Shards; this has only been used with a value of 'Mithral', in book 2.

sell – whether any articles can be sold at this market; if so, a 'To sell' column will be included.

*/

export default function Market({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='market'>{children}</DefaultNode>
  )
}