import React, { Component } from 'react';

class Form extends Component {

     // create refs
     titleRef = React.createRef();
     contentRef = React.createRef();

     createPost = (e) => {
          e.preventDefault();

          // read refs
          const post = {
               title : this.titleRef.current.value,
               body: this.contentRef.current.value,
               userId: 1
          }

          // console.log(post);

          // send by props or request of axios
          this.props.createPost(post);
     }

     render() { 
          return (
               <form onSubmit={this.createPost} className="col-8">
                    <legend className="text-center">Create New Post</legend>
                    <div className="form-group">
                         <label>Post Title:</label>
                         <input type="text" ref={this.titleRef} className="form-control" placeholder="Post Title"/>
                    </div>
                    <div className="form-group">
                         <label>Content: </label>
                         <textarea className="form-control" ref={this.contentRef}  placeholder="Content..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
               </form>
           );
     }
}
 
export default Form;