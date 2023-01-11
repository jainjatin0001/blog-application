import Header from "../../header/Header"
import Sidebar from "../../sidebar/Sidebar"
import Posts from "../../posts/Posts"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { postSearch } from "../../axios"

export default function Home() {
  const [post, setPosts]= useState([]);
  const {search} = useLocation()


  useEffect(() => {
    const fetchPosts = async () =>{
    //const res= await  axios.get("/posts" + search)
      const res= await postSearch(search)
    setPosts(res.data)
    }
    fetchPosts()
  }, [search])

  return (
    <>
     <Header />
      <div className="home">
        <Posts posts={post} />
        <Sidebar />
      </div>
    </>
  )
}
