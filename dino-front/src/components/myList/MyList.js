import './MyList.css'
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import {ListComponent} from "../list-component/ListComponent"

export const MyList = () => {
  const [list, setList] = useState([]);

  useEffect(()=>{
    getPlayLists()
  },[])

 const getPlayLists = async () =>{
  await fetch(API_URL + "playList")
  .then((response) => response.json())
  .then((response) => {
    setList(response);    
  })
 };
    
    return (
      <div id="my-list-container" className="container">
      
       <ListComponent movies={list} />
      </div>
    );
  };
  