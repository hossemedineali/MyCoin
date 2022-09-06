import {app,db} from "../../firebaseConfig"
import { doc, setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, collection} from "firebase/firestore";


export default async function handler (req,res){
    let {type,quantity,pricePerCoin,uid,total,portfolioid,coinid}={...req.body}
    let updatecoin={
        id:new Date().getTime(),
        type,
        quantity,
        pricePerCoin,
        total
      }
    const docToUpdateref=doc(db,"users",uid,"portfolios",portfolioid)

    //res.status(200).json({type,quantity,pricePerCoin,uid,total,portfolioid,id})
    await updateDoc(docToUpdateref,{[coinid]:arrayUnion(updatecoin)},{ merge: true })
    .then(response=>{
        res.status(200).json({type,quantity,pricePerCoin,uid,total,portfolioid,coinid,response})
    })
           
    

}