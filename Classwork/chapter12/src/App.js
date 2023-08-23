import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
const App = () => {
const postsUrl = "https://jsonplaceholder.typicode.com/posts"
const todosUrl = "https://jsonplaceholder.typicode.com/todos"
const [requested, setRequested] = useState(postsUrl)
return(
<div>
<Button variant="link" onClick={() => setRequested(postsUrl)}>