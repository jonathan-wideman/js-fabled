import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<rankcheck [add="N"] [dice="N"] [force="B"] [var="S"]>
Roll one or more dice, comparing the result to the character's Rank ability. 'Success' is counted as rolling less than or equal to Rank; 'failure' is rolling more than Rank. The result can be tested for using the <success> and <failure> tags, as with the <difficulty> action.

add – The number to be added to the dice roll.

dice – The number of dice to roll; defaults to 1. The default text is 'roll one die', 'roll two dice', or 'roll X dice', depending on the value.

force – Whether this action is forced; defaults to true.

var – The variable into which the 'result' is stored. The result, in this case, is the character's Rank plus 1, minus the result of the dice. This means that success is indicated by the result being greater than zero, failure being less than or equal to zero (as for the <difficulty> action).

*/

export default function RankCheck({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='rankcheck'>{children}</DefaultNode>
  )
}