import React, { useMemo } from "react";
import { useReaderContext } from "../../ReaderContext";

import DebugVerboseText from "./DebugVerboseText";
// import { matchTags } from "../../util";
import { PageProvider } from "./PageContext";
import { preProcessAst, processAst, visitElement, xmlAst } from "./parser";
import { useAtom } from "jotai";
import { debugParserXmlToolsAtom } from "../../store/debug";
import { pageAtom } from "../../store/book";

function Page({ page, storyQuery }) {
  const [debugParserXmlTools] = useAtom(debugParserXmlToolsAtom);

  const ast = useMemo(() => {
    if (storyQuery.isLoading || storyQuery.error) {
      return null;
    }
    const ast = xmlAst(storyQuery.data);
    console.log("ast", ast);
    const preProcessed = preProcessAst(ast.rootElement, 0, 0);
    console.log("preProcessed", preProcessed);
    const result = processAst(ast, visitElement);
    return result;
  }, [storyQuery]);

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
  const { storyQuery } = useReaderContext();
  const [page] = useAtom(pageAtom);

  return (
    <div className="story">
      <Page storyQuery={storyQuery} page={page} />

      <DebugVerboseText>
        {storyQuery.data && <pre>{storyQuery.data}</pre>}
        storyQuery
      </DebugVerboseText>
    </div>
  );
}
