import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nextPage, prevPage } from "../helpers";
import { useAtom } from "jotai";
import {
  debugParserXmlToolsAtom,
  debugRawXmlAtom,
  debugVerboseAtom,
} from "../store/debug";
import {
  bookAtom,
  clearHistoryAtom,
  gotoPageAtom,
  historyAtom,
  pageAtom,
} from "../store/book";

export default function DebugPanel() {
  const [book] = useAtom(bookAtom);
  const [page] = useAtom(pageAtom);
  const [history] = useAtom(historyAtom);
  const [, gotoPage] = useAtom(gotoPageAtom);
  const [, clearHistory] = useAtom(clearHistoryAtom);
  const [debugVerbose, setDebugVerbose] = useAtom(debugVerboseAtom);
  const [debugRawXml, setDebugRawXml] = useAtom(debugRawXmlAtom);
  const [debugParserXmlTools, setDebugParserXmlTools] = useAtom(
    debugParserXmlToolsAtom
  );
  const [inputBook, setInputBook] = useState(book);
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  useEffect(() => {
    setInputBook(book);
  }, [book]);

  const gotoNextPage = () => {
    const next = nextPage(page);
    if (next) {
      setInputPage(next);
      gotoPage({ book, page: next });
    }
  };

  const gotoPrevPage = () => {
    const prev = prevPage(page);
    if (prev) {
      setInputPage(prev);
      gotoPage({ book, page: prev });
    }
  };

  return (
    <div className="sidebar-content debug">
      <h3>Debug Panel</h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            gotoPage({ book: inputBook, page: inputPage });
          }}
        >
          <button type="submit">goto</button>
          <input
            name="inputBook"
            type="text"
            onChange={(e) => setInputBook(e.target.value)}
            value={inputBook}
          />
          <input
            name="inputPage"
            type="text"
            onChange={(e) => setInputPage(e.target.value)}
            value={inputPage}
          />
          <button type="button" onClick={gotoPrevPage}>
            prev
          </button>
          <button type="button" onClick={gotoNextPage}>
            next
          </button>
        </form>
      </div>
      <div>
        History:
        <ul>
          {history.map((node, index) => (
            <li
              key={index}
              className="action"
              onClick={() => gotoPage({ book: node.book, page: node.page })}
            >
              {node.book} - {node.page}
            </li>
          ))}
        </ul>
        <button onClick={() => clearHistory()}>clear</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        Output:
        <label>
          <input
            type="checkbox"
            onChange={() => setDebugParserXmlTools((prev) => !prev)}
            checked={debugParserXmlTools}
          />
          xml-tools
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => setDebugRawXml((prev) => !prev)}
            checked={debugRawXml}
          />
          raw xml
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => setDebugVerbose((prev) => !prev)}
            checked={debugVerbose}
          />
          verbose
        </label>
      </div>
      <div>
        <Dice count={2} />
      </div>
    </div>
  );
}
