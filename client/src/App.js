import axios from 'axios';
import React, {useState , useEffect} from 'react'; 
import Routes from "./components/Routes" 
import { UidContext } from './components/AppContext';
import { useDispatch} from 'react-redux'
import { getUser } from './actions/user.actions';

const App = () => {    
   const [uid,setUid] = useState(null); 
   const dispatch=useDispatch(); 

   useEffect(()=> {
       const fetchToken = async() => { console.log(`http://localhost:${process.env.PORT}/jwtid`)
           await axios({
               method:"get",// http://localhost:5000/
               url: `http://localhost:${process.env.PORT}/jwtid` , 
                withCredentials  : true , 
           })
           .then((res)=> {
               setUid(res.data); 
           })
           .catch((err) => console.log("No token")); 
       }; 
       fetchToken(); 

       if(uid) dispatch(getUser(uid)); 
   }
   , [uid , dispatch]); 
    return (
        <UidContext.Provider value={uid}> 
          <Routes/> 
        </UidContext.Provider> 
    )
}

export default App