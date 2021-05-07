// import {useState,useEffect} from 'react'
function useFetch(url) {
	// const [data,setData]=useState([])
	return fetch(url).then((res) => res.json());
}

export default useFetch;