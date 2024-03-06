import React, { createElement, useMemo } from "react";
import { useGameContext } from "../../GameContext";
// import Goto from './Goto'

// import { ReactDOM } from 'react'
import XMLToReact from "@condenast/xml-to-react";
import converters from "./converters";
import DebugVerboseText from "./DebugVerboseText";
import { matchTags } from "../../util";
import { PageProvider } from "./PageContext";
import { processAst, visitElement, xmlAst } from "./parser";

const xmlToReact = new XMLToReact(converters);

// xmlToReact.baseConvert = xmlToReact.convert
// xmlToReact.convert = function (xml, data) {
//   const converted = this.baseConvert(xml, data)
//   // if (converted == null) { console.log('Could not convert', xml) }
//   console.log(converted, xml)
//   return converted
// }

function Page({ page, storyData }) {
  // const reactTree = xmlToReact.convert(`
  //   <Example name="simple">
  //   <Item i="1">one</Item>
  //   <Item>two</Item>
  //   <Item>three</Item>
  //   </Example>
  // `)

  const reactTree = useMemo(() => {
    if (storyData.isLoading || storyData.error) {
      return null;
    }
    // console.log(storyData.data)
    return xmlToReact.convert(storyData.data);
  }, [storyData]);

  const ast = useMemo(() => {
    if (storyData.isLoading || storyData.error) {
      return null;
    }
    const ast = xmlAst(storyData.data);
    console.log(ast);
    const result = processAst(ast, visitElement);
    // const result = processAst(ast, (element) => {
    //   // console.log(element.name);
    //   return element.name;
    // });
    // console.log(result);

    // return createElement(() => <div>hi</div>, {}, [])
    return result
  }, [storyData]);

  return <PageProvider page={page}>
    {reactTree}
    {ast}
  </PageProvider>;
}

export default function Story() {
  const { page, storyData } = useGameContext();

  // const reactTree = xmlToReact.convert(`
  //   <Example name="simple">
  //   <Item i="1">one</Item>
  //   <Item>two</Item>
  //   <Item>three</Item>
  //   </Example>
  // `)

  // const reactTree = useMemo(() => {
  //   if (storyData.isLoading || storyData.error) { return null }
  //   // console.log(storyData.data)
  //   return xmlToReact.convert(storyData.data)
  // }, [storyData])

  return (
    <div className="story">
      {/* <PageProvider page={page}>
        {reactTree}
      </PageProvider> */}

      <Page storyData={storyData} page={page} />

      <DebugVerboseText>
        {storyData.data && <pre>{storyData.data}</pre>}
      </DebugVerboseText>

      {/* <DebugVerboseText>
        {storyData.data && <pre>
          {`TAGS:\n`}
          {Object.entries(matchTags(storyData.data)).map(entry => `<${entry[0]}>: ${entry[1]}\n`)}
        </pre>}
      </DebugVerboseText> */}
    </div>
  );
}
