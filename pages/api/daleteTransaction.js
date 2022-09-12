import { red } from "@mui/material/colors";
import { updateDoc,doc} from "firebase/firestore";
import {app,db} from "../../firebaseConfig"

export default async function handler(req,res){
    let {id,portfolioid,coin,coindata}={...req.body}
    
    
    const docToUpdateref=doc(db,"users",id,"portfolios",portfolioid)
    await updateDoc(docToUpdateref,coin,coindata)
    .then(response=>{
      res.status(200).json({response})
    })
    .catch(error=>{
      res.status(400).json({error})
    })
    
   
   
    // res.status(200).json({...req.body})
    
   
}



    

  
   
  
    


























/* import {app,db} from "../../firebaseconfig"
import {collection, getDocs} from "firebase/firestore";


export default async function handler (req,res){
    const uid=req.body.data.uid
    let data=[]
    if(false){
      const querySnapshot = await getDocs(collection(db, "users",uid,"portfolios"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data())
        console.log(doc.id, " => ", doc.data());
  
        console.log(doc)
      }); 
  
      res.status(200).json({message:'test'})
    }
  

    
} */