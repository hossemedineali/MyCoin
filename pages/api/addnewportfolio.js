import {app,db} from "../../firebaseConfig"
import { doc, setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, collection} from "firebase/firestore";


export default async function handler(req,res){
    const name=req.body.name
    const uid=req.body.uid

  
    if(name){
        if(name.trim()==''){
            res.status(400).json({isError:true})
    
        }
        else
        {
    
          
            await  setDoc(doc(db,"users",uid,"portfolios",name),{}).then((response)=>{
                res.status(200).json({...response})
               })
        } 
    }else{
        res.status(200).json({messaage:'test'})
    }
  
    
}