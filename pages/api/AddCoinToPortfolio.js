import { red } from "@mui/material/colors";
import { updateDoc,doc} from "firebase/firestore";
import {app,db} from "../../firebaseConfig"

export default async function handler(req,res){
    let {uid,portfolioid,coin,coindata}={...req.body}
    
    
    const docToUpdateref=doc(db,"users",uid,"portfolios",portfolioid)
     updateDoc(docToUpdateref,coin,[])
    
   
   
    // res.status(200).json({...req.body})
    
   
}