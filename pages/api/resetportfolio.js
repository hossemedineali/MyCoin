//       /api/resetportfolio


import {app,db} from "../../firebaseConfig"
import { doc, setDoc, collection} from "firebase/firestore";




export default async function handler (req,res){

    const {id,portfolioid,coindata}={...req.body}

    //res.status(200).json({id,portfolioid,coindata})

    await  setDoc(doc(db,"users",id,"portfolios",portfolioid),coindata)
    .then((response)=>{
        res.status(200).json({...response})
    })
   .catch(error=>{
        res.status(400).json({error})
    }) 
    
}