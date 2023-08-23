//-- we import useState from the react library as we will be using it for hooks --//
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const App = () => {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";

  //-- the useState() provides state to a functional component --//
  //-- setRequested is the setter method to update the value of this piece of state --//

  //-- useState returns two elements
  //   the first element returned is assigned to requested 
  //   which contains the current value of this piece of state
  //   The second element returned is assigned to setRequested 
  //   which is the setter to update this piece of state --//
  const [requested, setRequested] = useState(postsUrl);

  //-- we declare an array data that holds the requested data in our state
  //   we initialize data to an empty array [] --//
  const [data, setData] = useState([]);

  //-- we have to pass an empty array as a second argument to useEffect() to mimic componentDidMount()
  //   if we don't, useEffect() will mimic componentDidUpdate() and will infinately make requests to posts
  //   and will repeatedly update the state with setData, calling useEffect() again, causing an infinite loop --//
  useEffect(() => {
    fetch(requested)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <div>
      <Button variant="link" onClick={() => setRequested(postsUrl)}>
        Posts
      </Button>
      <Button variant="link" onClick={() => setRequested(todosUrl)}>
        Todos
      </Button>
      <br />
      Requested: {requested}
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;