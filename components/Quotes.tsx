import React from "react";

async function Quotes() {
  let result = await fetch("https://api.quotable.io/quotes/random", {cache: "no-cache"});
  let quote = await result.json();

  return (
    <div className="flex justify-center items-center flex-col mt-10 mx-5 text-center text-sm">
      <div className="quote">&quot; {quote[0].content} &quot;</div>
      <div className="author mt-5">&quot; {quote[0].author} &quot;</div>
    </div>
  );
}

export default Quotes;
