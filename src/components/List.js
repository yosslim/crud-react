import React, { Component } from 'react';
import Post from './Post';

class List extends Component {

     showPosts = () => {
          const posts = this.props.posts;

          if(posts.length === 0) return null;

          return (
               <React.Fragment>
                    {Object.keys(posts).map(post => (
                         <Post
                              key={post}
                              info={this.props.posts[post]}
                              deletePost={this.props.deletePost}
                         />
                    ))}
               </React.Fragment>
          )
     }

     render() { 
          return (
               <table className="table">
                    <thead>
                         <tr> 
                              <th scope="col">ID</th>
                              <th scope="col">Title</th>
                              <th scope="col">Actions</th>
                         </tr> 
                    </thead>
                    <tbody>
                         {this.showPosts() }
                    </tbody>
               </table>
           )
     }
}
 
export default List;