import React, { Component } from 'react';

class Edit extends Component {

     // create refs
     titleRef = React.createRef();
     contentRef = React.createRef();

     editPost = (e) => {
          e.preventDefault();

          // read refs
          const post = {
               title : this.titleRef.current.value,
               body: this.contentRef.current.value,
               userId: 1,
               id: this.props.post.id
          }

          // console.log(post);

          // send by props or request of axios
           this.props.editPost(post);
     }

     loadFormulary = () => {

          if(!this.props.post) return null;

          const {title, body} = this.props.post;

          return(
               <form onSubmit={this.editPost} className="col-8">
                    <legend className="text-center">Edit Post</legend>
                    <div className="form-group">
                         <label>Post Title:</label>
                         <input type="text" ref={this.titleRef} className="form-control" defaultValue={title} />
                    </div>
                    <div className="form-group">
                         <label>Content: </label>
                         <textarea className="form-control" ref={this.contentRef}  defaultValue={body} ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
               </form>
          )
     }

     render() { 

          
          return ( 
               <React.Fragment>
                    { this.loadFormulary() }
               </React.Fragment>
           );
     }
}
 
export default Edit;