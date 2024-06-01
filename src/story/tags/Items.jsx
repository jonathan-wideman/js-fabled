import React from "react";
import DefaultNode from "./DefaultNode";

/*

TODO:
This doesn't have an entry in official docs. It seems to take a limit and a group attribute that limits the number of items you can take from the group.

See book1:16 for an example.

*/

export default function Items({ children, ...others }) {
  return (
    <DefaultNode {...others} nodeType="items">
      {children}
    </DefaultNode>
  );
}
