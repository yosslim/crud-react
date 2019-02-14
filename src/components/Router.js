import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2'

//Components
import Header from './Header';
import Nav from './Nav';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Form from './Form';
import Edit from './Edit';

class Router extends Component {
     state = { 
          posts: []
      }
      componentDidMount() {
           this.getPost();
      }

      getPost = () => {
          axios.get(`https://jsonplaceholder.typicode.com/posts`)
               .then(res => {
                    this.setState({
                         posts: res.data
                    })
               })
     }

     deletePost = (id) => {
          axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
               .then(result=>{
                    if(result.status === 200) {
                         const posts = [...this.state.posts];
                         
                         let res = posts.filter(post => (
                              post.id !== id
                         ));
                         this.setState({
                              posts: res
                         })
                    }
               })
     }

     createPost = (post) => {
         axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
                .then(res => {
                    if(res.status === 201) { //http code 201 created
                        swal(
                            'Post Created',
                            'It was created correctly',
                            'success'
                        )
                        let postId = {id: res.data.id};
                       const newPost = Object.assign({}, res.data.post, postId);

                       this.setState(prevState => ({
                           posts: [...prevState.posts, newPost]
                       }))
                    }
                })
     }

     editPost = (postUpdated) => {
        //  console.log(postUpdated);

         const {id} = postUpdated;

         axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postUpdated})
            .then(res => {
                if(res.status === 200) { //http code 201 OK

                    swal(
                        'Post Updated',
                        'It was saved correctly',
                        'success'
                    )

                    let postId = res.data.id;

                    const posts = [...this.state.posts];

                    const postEdit = posts.findIndex(post => postId === post.id );

                    posts[postEdit] = postUpdated;

                    this.setState({
                        posts
                    })
                }
            })
     }

     render() { 
          return ( 
               <BrowserRouter>
                    <div className="container">
                         <div className="row justify-content-center">
                              <Header />
                              <Nav/>
                              <Switch>
                                   <Route exact path="/" render={ () => {
                                        return(
                                             <Posts 
                                                  posts={this.state.posts}
                                                  deletePost={this.deletePost}
                                             />
                                        )
                                   }}
                                   />
                                   <Route exact path="/post/:postId" render={ (props) => {
                                        let idPost = props.location.pathname.replace('/post/', '');

                                        const posts = this.state.posts;

                                        let filter;
                                        filter = posts.filter(post => (
                                             post.id === Number(idPost)
                                        ))
                                        return(
                                             <SinglePost
                                                  post={filter[0]}
                                             />
                                        )
                                   } }
                                   />

                                   <Route exact path="/create" render={ () => {
                                            return(
                                                <Form 
                                                createPost={this.createPost}
                                                />
                                            )
                                    }}
                                    />
                                    <Route exact path="/edit/:postId" render={ (props) => {
                                        let idPost = props.location.pathname.replace('/edit/', '');

                                        const posts = this.state.posts;

                                        let filter;
                                        filter = posts.filter(post => (
                                             post.id === Number(idPost)
                                        ))
                                        return(
                                             <Edit
                                                  post={filter[0]}
                                                  editPost={this.editPost}
                                             />
                                        )
                                   } }
                                   />

                              </Switch>
                         </div>
                    </div>
               </BrowserRouter>
           );
     }
}
 
export default Router;