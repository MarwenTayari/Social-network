import React , { useContext , useState , useEffect } from 'react'
import { UidContext } from "../AppContext" 
import { useDispatch} from 'react-redux'
import Popup from "reactjs-popup" 
import 'reactjs-popup/dist/index.css'
import { likePost , unlikePost} from '../../actions/post.actions'

const LikeButton = ({post}) => { 
    const [liked , setLiked] =useState(false) ; 
    const uid = useContext(UidContext); 
    const dispatch = useDispatch() ; 

    const like = () => {
      dispatch(likePost(post._id, uid)); 
      setLiked(true); 
    }

    const unLike = () => {
      dispatch(unlikePost(post._id, uid)); 
      setLiked(false); 
    }

    useEffect(()=> {
        if(post.likers.includes(uid)) setLiked(true) 
        else setLiked(false); 
    }) 

    return (
        <div className='like-container'>
            { 
             uid === null && 
                (<Popup trigger={<img src="./img/icons/heart.svg" alt="like" />} position={
                 ['bottom center', 'bottom right' , 'bottom left']} classOnDocumentClick> 
                 <div > Connectez-vous pour aimer un post !</div>
                 </Popup>)
             } 
             { uid && liked === false && (
                 <img src="./img/icons/heart.svg" onClick={like} alt="like" />
             ) 
             }
             { uid && liked && (
                 <img src="./img/icons/heart-filled.svg" onClick={unLike} alt="like" />
             ) 
             }
             <span>{post.likers.length}</span>
        </div> 
    )
}

export default LikeButton