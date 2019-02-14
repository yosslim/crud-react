import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

class Post extends Component {

    deleteConfirm = () => {

            const {id} = this.props.info;

            swal({
                title: 'Are you sure?',
                text: "This action can not be undone!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete!',
                cancelButtonText : 'Cancel'
            }).then((result) => {
                if (result.value) {
                    this.props.deletePost(id)
                    swal(
                        'Removed!',
                        'The post has been removed.',
                        'success'
                    )
                }
            })

        
    }

     render() { 

          const {id, title} = this.props.info;

          return (
               <tr>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>
                         <Link to={`/post/${id}`} className="btn btn-primary">Show</Link>
                         <Link to={`/edit/${id}`} className="btn btn-warning">Edit</Link>
                         <button onClick={ this.deleteConfirm } type="button" className="btn btn-danger">Delete</button>
                    </td>
               </tr>
           );
     }
}
 
export default Post;