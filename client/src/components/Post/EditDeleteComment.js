import React, {useState , useContext , useEffect} from 'react'
import { UidContext } from '../AppContext'; 
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../actions/post.actions';

const EditDeleteComment = ({comment , postId}) => { 
    const [isAuthor , setIsAuthor ] = useState(false); 
    const [edit , setEdit] = useState(false); 
    const [text,setText] = useState(comment.text);  
    const uid = useContext(UidContext); 
    const dispatch = useDispatch(); 

    const handleEdit = (e) => { 
        e.preventDefault(); 
        if(text){
          dispatch(editComment(postId , comment._id , text)); 
          setEdit(false)
        }
    }

    const handleDelete = () => dispatch(deleteComment(postId , comment._id ))

    useEffect(()=> {
        const checkAuthor = () => {
            if (uid === comment.commenterId){
                setIsAuthor(true)
            }
        }
        checkAuthor(); 
    },[uid , comment, comment.commenterId])


    return (
        <div className="edit-comment"> 
            { isAuthor && edit=== false && (
                <span onClick={()=> setEdit(!edit)}> 
                  <img src="./img/icons/edit.svg" alt="edit-comment" /> 
                </span>
            )} 
            { isAuthor && edit && (
               <form action="" onSubmit={handleEdit} 
               className="edit-comment-form">
                   <label htmlFor="text" onClick={()=> {setEdit(!edit)}} >Editer</label> 
                   <br/>  
                   <input 
                   type="text" 
                   name="text" 
                   onChange={(e)=> setText(e.target.value)}
                   value={text}
                   > 
                   </input>
                   <br/> 
                   <div className="btn"> 
                       <span onClick={()=> {
                           if(window.confirm("Voulez-vous supprimer ce commentaire")){
                               handleDelete(); 
                           }
                       }}> 
                          <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                   </div> 
                   <input type="submit" value="Valider modification"></input>
               </form>
            )}
        </div>
    )
}

export default EditDeleteComment
