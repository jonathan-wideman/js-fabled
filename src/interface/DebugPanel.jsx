import React, { useEffect, useState } from "react";
import D6 from "./D6";
import Dice from "./Dice";
import { useGameContext } from "../GameContext";
import { nextPage, prevPage } from "../helpers";

export default function DebugPanel() {
  const {
    rng,
    book,
    page,
    history,
    gotoPage,
    clearHistory,
    debugVerbose,
    setDebugVerbose,
    debugParserXmlToReact,
    setDebugParserXmlToReact,
    debugParserXmlTools,
    setDebugParserXmlTools,
  } = useGameContext();
  const [inputBook, setInputBook] = useState(book);
  const [inputPage, setInputPage] = useState(page);
  const [roll, setRoll] = useState();

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  const gotoNextPage = () => {
    const next = nextPage(page);
    if (next) {
      gotoPage(next);
    }
  };

  const gotoPrevPage = () => {
    const prev = prevPage(page);
    if (prev) {
      gotoPage(prev);
    }
  };

  return (
    <div className="debug pane">
      <h3>Debug Panel</h3>
      <div>
        <button onClick={() => gotoPage(inputPage, inputBook)}>goto</button>
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
        <button onClick={gotoPrevPage}>prev</button>
        <button onClick={gotoNextPage}>next</button>
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
            onChange={() => setDebugParserXmlToReact((prev) => !prev)}
            checked={debugParserXmlToReact}
          />
          xml-to-react
        </label>
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
        {/* <button onClick={() => setRoll(rng.d6())}>d6</button>
        <button onClick={() => setRoll(rng.sum2d6())}>2d6</button>
        result: {roll} */}
        {/* <div className='dice'>
          <D6 />
          <D6 />
        </div> */}
        <Dice count={2} />
      </div>
    </div>
  );
}
