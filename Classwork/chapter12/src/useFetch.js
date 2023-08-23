import { useState, useEffect } from 'react';

//-- we have to pass an empty array as a second argument to useEffect() to mimic componentDidMount()
//   if we don't, useEffect() will mimic componentDidUpdate() and will infinately make requests to posts
//   and will repeatedly update the state with setData, calling useEffect() again, causing an infinite loop --//
const useFetch = (url) => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
    }, [url])
    return data
}

export default useFetch;