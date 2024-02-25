import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<training ability="S" [add="N"] [dice="N"] [var="S"]>
Roll the given number dice; if greater than the current value of the given ability, raise that ability by one.

ability – The ability to be tested against and raised. Multiple abilities may be selected from using '*', '?', or by separating a list of ability names with '|'.

add – The value to add to the dice roll.

dice – The number of dice to be rolled; defaults to two. The default text is 'roll one die', 'roll two dice', or 'roll X dice', depending on the value of this attribute.

var – The variable to store the result in. The result, in this case, is the result of the dice roll plus add.
*/

export default function Training({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='training'>{children}</DefaultNode>
  )
}