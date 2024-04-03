import React, { useMemo } from "react";
import { useReaderContext } from "../../ReaderContext";

import DebugVerboseText from "./DebugVerboseText";
// import { matchTags } from "../../util";
import { PageProvider } from "./PageContext";
import { processAst, visitElement, xmlAst } from "./parser";
import { useAtom } from "jotai";
import { debugParserXmlToolsAtom } from "../../store/debug";
import { pageAtom } from "../../store/book";

function Page({ page, storyData }) {
  const [debugParserXmlTools] = useAtom(debugParserXmlToolsAtom);

  const ast = useMemo(() => {
    if (storyData.isLoading || storyData.error) {
      return null;
    }
    const ast = xmlAst(storyData.data);
    const result = processAst(ast, visitElement);
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
  const { storyData } = useReaderContext();
  const [page] = useAtom(pageAtom);

  return (
    <div className="story">
      <Page storyData={storyData} page={page} />

      <DebugVerboseText>
        {storyData.data && <pre>{storyData.data}</pre>}
        storyData
      </DebugVerboseText>
    </div>
  );
}
