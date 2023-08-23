//-- we import useState from the react library as we will be using it for hooks --//
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import useFetch from './useFetch';
import Users from './Users'

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
  const data = useFetch(requested)

  return (
    <div>
      <Users />
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