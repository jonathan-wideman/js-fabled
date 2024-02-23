import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<group [force="B"]>
Perform a sequence of actions with one 'click'. The <group> tag should contain one or more action tags, usually preceded by a <text> tag giving the action text. Group tags are tricky; their initial enabled/disabled state is gotten from their first action 'child'; a reroll triggered after the group tag will backtrack to the last child action of the group. Use with care!

force – whether this action must be clicked; defaults to false.
*/

export default function Group({ children, ...others }) {

    return (
        <DefaultNode {...others} nodeType='group'>{children}</DefaultNode>
    )
}