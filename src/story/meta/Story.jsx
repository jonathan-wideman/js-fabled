import React, { createElement, useMemo } from "react";
import { useGameContext } from "../../GameContext";
// import Goto from './Goto'

// import { ReactDOM } from 'react'
import converters from "./converters";
import DebugVerboseText from "./DebugVerboseText";
import { matchTags } from "../../util";
import { PageProvider } from "./PageContext";
import { processAst, visitElement, xmlAst } from "./parser";
import { useAtom } from "jotai";
import { debugParserXmlToolsAtom } from "../../store/debug";

function Page({ page, storyData }) {
  const [debugParserXmlTools] = useAtom(debugParserXmlToolsAtom);

  const ast = useMemo(() => {
    if (storyData.isLoading || storyData.error) {
      return null;
    }
    const ast = xmlAst(storyData.data);
    const result = processAst(ast, visitElement);
    // const result = processAst(ast, (element) => {
    //   // console.log(element.name);
    //   return element.name;
    // });
    // console.log(result);

    // return createElement(() => <div>hi</div>, {}, [])
    return result;
  }, [storyData]);

  return (
    <PageProvider page={page}>
      {debugParserXmlTools && (
        <>
          {ast}
          <DebugVerboseText>xml-tools output</DebugVerboseText>
        </>
      )}
    </PageProvider>
  );
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
        storyData
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
