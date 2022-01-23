import React from 'react'
import { useDispatch} from "react-redux"
import { deletePost , getPost } from '../../actions/post.actions';

const DelateCard = (props) => {
    const dispatch = useDispatch(); 

   const deleteQuote = () => {
      dispatch(deletePost(props.id)); 
      dispatch(getPost());  
   }

    return (
        <div onClick={()=> {
            if (window.confirm('Voulez-vous supprimer cet article ?'))
            { deleteQuote(); }
        }}>
            <img src="./img/icons/trash.svg" alt="trash" />
        </div>
    )
}

export default DelateCard
