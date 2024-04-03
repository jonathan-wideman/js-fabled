import React, { useEffect, useState } from "react";
import D6 from "./D6";
import Dice from "./Dice";
import { useGameContext } from "../GameContext";
import { nextPage, prevPage } from "../helpers";

export default function DebugPanel() {
  const {
    book,
    page,
    history,
    gotoPage,
    clearHistory,
    debugVerbose,
    setDebugVerbose,
    debugParserXmlTools,
    setDebugParserXmlTools,
  } = useGameContext();
  const [inputBook, setInputBook] = useState(book);
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  const gotoNextPage = () => {
    const next = nextPage(page);
    if (next) {
      setInputPage(next);
      gotoPage(next);
    }
  };

  const gotoPrevPage = () => {
    const prev = prevPage(page);
    if (prev) {
      setInputPage(prev);
      gotoPage(prev);
    }
  };

  return (
    <div className="debug pane">
      <h3>Debug Panel</h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            gotoPage(inputPage, inputBook);
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
              onClick={() => gotoPage(node.page, node.book)}
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
