import axios from 'axios'
import React, { useEffect, useState } from 'react'
import _, { take } from "lodash"
// import Pagination from './Pagination';


const pageSize = 10;
const Post = () => {
    let [post ,setPost]=useState()
    let [pagination , setPagination] = useState()
    let [currentPage ,setCurrentPage]=useState(1)
//     const [posts, setPosts] = useState([]);
//   const [error, setError] = useState("");
    
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(res=>{
            console.log(res.data)
            setPost(res.data)
            setPagination(_(res.data).slice(0).take(pageSize).value())
        })
    },[])
    const pageCount = post ? Math.ceil(post.length/pageSize):0;
    if(pageCount === 1) return null;
    const pages = _.range( 1,pageCount+1)
    const paginate=(pageNo)=>{
        setCurrentPage(pageNo)
        const startIndex = (pageNo-1)*pageSize
        const pagination = _(post).slice(startIndex).take(pageSize).value()
        setPagination(pagination)
    }
    return (<div>
        {
            !pagination ? ("No page found" ): (
                <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
               {
                   
                   pagination.map((post,index) => (
                       <tr key = {index}>
                           <td>{post.id}</td>
                           <td>{post.userId}</td>
                           <td>{post.title}</td>
                           <td>
                               <p className={post.completed ? "btn btn-success" :"btn btn-danger"}>
                                   {post.completed ? "completed" :"pending"}
                               </p>
                           </td>
                          
                       </tr>
                   ))
               }

                </tbody>
                </table>
            )

         
        }
        <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
                {
                    pages.map((page)=>(
                        <li className={
                            page === currentPage?"page-item active":"page-item"
                        }><p className='page-link'onClick={()=>paginate(page)}>{page}</p></li>
                    ))
                }
            </ul>
        </nav>

{/* {post.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Post"
            pageLimit={5}
            dataLimit={10}
          />
        </>
      ) : (
       <h1>No Posts to display</h1>
      )} */}
    </div>

    )
}

export default Post