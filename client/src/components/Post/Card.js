import React, {useState , useEffect} from 'react'
import { dateParser, isEmpty } from '../Utils';
import { useSelector , useDispatch} from 'react-redux'
import FollowHandler from '../Profil/followHandler';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions'; 
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({post}) => {
    const [isLoading,setIsLoading] =useState(true); 
    const [iseUpdated, setIsUpdated] = useState(false); 
    const [textUpdated, setTextUpdated] = useState(post.message);  
    const [showComments , setShowComments] = useState(false); 
    const usersData = useSelector(state=> state.usersReducer) ; 
    const userData = useSelector(state=> state.userReducer) ; 
    const dispatch = useDispatch(); 

    const updateItem = () => {
    if(textUpdated) {
        dispatch(updatePost(post._id , textUpdated))
    }
      setIsUpdated(false)
    }

    useEffect(()=> {
        !isEmpty(usersData) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
             {
                 isLoading ? ( 
                     <ul> 
                         <li className="fas fa-spinner fa-spin"> </li>
                     </ul>  
                 ) : (
                     <> 
                        <div className="card-left">
                            <img src={!isEmpty(usersData[0]) && 
                                usersData.map((user)=> {
                                    if(user._id === post.posterId) return user.picture 
                                    else return null 
                                }).join(' ')}  alt='poster-pic' />
                        </div>
                        <div className="card-right">
                            <div className="card-header"> 
                             <div className="pseudo"> 
                               <h3> 
                                    {!isEmpty(usersData[0]) && 
                                    usersData.map((user)=> {
                                        if(user._id === post.posterId) return user.pseudo
                                        else return null 
                                    }).join(' ')}  
                                </h3>
                                { post.posterId !== userData._id && (
                                   <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                )}
                             </div>  
                             <span>{dateParser(post.createdAt)} </span>
                            </div>
                            { iseUpdated === false && <p>{post.message}</p>}
                            { iseUpdated && ( 
                                <div className="update-post">
                                  <textarea value={textUpdated} 
                                  onChange={(e)=> setTextUpdated(e.target.value)}> </textarea>
                                  <div className='button-container'> 
                                   <button className="btn" onClick={updateItem}>Valider modification</button>
                                  </div>
                                </div>
                            )}
                            { post.picture && <img src={post.picture} alt="card-pic" className="card-pic"/>} 
                            { post.video && 
                             <iframe 
                             width="500" 
                             height="300" 
                             src={post.video} 
                             title={post._id}
                             frameBorder="0"
                             allow="accelerometer; 
                             autoplay; 
                             clipboard-write; 
                             encrypted-media; 
                             gyroscope; 
                             picture-in-picture" 
                             allowFullScreen>
                             </iframe>
                            } 
                            { 
                             userData._id === post.posterId && (
                                 <div className="button-container"> 
                                   <div onClick={()=> { setIsUpdated(!iseUpdated)}}> 
                                   <img src="./img/icons/edit.svg" alt="edit" />
                                   </div>
                                   <DeleteCard id={post._id} />
                                 </div>
                             )
                            }
                            <div className="card-footer"> 
                              <div className="comment-icon"> 
                                <img src="./img/icons/message1.svg" onClick={()=> setShowComments(!showComments)} alt="comment" /> 
                                <span>{post.comments.length}</span>
                              </div>
                              <LikeButton post={post} />
                              <img src="./img/icons/share.svg" alt="share" />
                            </div>
                            { showComments && <CardComments post={post} />}
                        </div>
                   </>
                 )
             }
        </li>
    )
}

export default Card