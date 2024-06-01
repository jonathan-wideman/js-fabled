import { useAtom } from "jotai";
import { debugRawXmlAtom } from "../../store/debug";
import { useReaderContext } from "../../ReaderContext";

export default function DebugRawXmlText({ children }) {
  const { storyQuery } = useReaderContext();
  const [debugRawXml] = useAtom(debugRawXmlAtom);

  return debugRawXml ? (
    <div className="debug-verbose">
      <hr className="hr-border-fade" />
      storyQuery
      {storyQuery.data && <pre>{storyQuery.data}</pre>}
    </div>
  ) : null;
}
