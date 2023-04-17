import './style.css';
import { useEffect } from 'react';
import { useState } from'react';

const api_url = "https://api.quotable.io/quotes?tags=famous-quotes";

export default function App() {

  console.log('(re)rendering');


  const [quotes, setQuotes] = useState(null);
  const [quote, setQuote] = useState(null);

  function randomQuote () {
    console.log('random quote');
    setQuote(quotes.results[Math.floor(Math.random() * quotes.results.length)]);
  }

  // Fetch data from the quote API
  useEffect(() => {

    // Otherway to do in the refactoring. I learned it from the solution code
    // function randomQuote (data) {
    //   console.log('random quote use Effect');
    //   console.log(data);
    //   console.log('-----');
    //   setQuote(data.results[Math.floor(Math.random() * data.results.length)]);
    // }

    // try {
    //   console.log('fetching data from API');
    //   const response = await fetch(api_url);
    //   console.log('leaving await fetch');
    //   console.log('await response.json');
    //   let data = await response.json();
    //   setQuotes(data);
    //   randomQuote(data);  // if(!quote && quotes) randomQuote();

    async function fetchData() {

      try {
        console.log('fetching data from API');
        const response = await fetch(api_url);
        console.log('leaving await fetch');
        console.log('await response.json');
        let data = await response.json();
        setQuotes(data);

        console.log('leaving await response.json');
      }
      catch (error) {
        console.log(error);
        return null;
      }
    }
    fetchData();

  }, []);

  if(!quote && quotes) randomQuote();

  console.log(quotes);

  console.log(quote ? quote : 'nothing');


  return (
    <div className="App">
      <h1>Project 3: Quote Generator</h1>

      <div className="quote-generator">
        <button onClick={randomQuote}>New quote</button>
        <p className="quote">{quote ? quote.content : ''}</p>
        <p className="author">- {quote ? quote.author : ''}</p>
      </div>
    </div>
  );
}


