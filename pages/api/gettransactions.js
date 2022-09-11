import axios from "axios";
import {getDocs, doc, setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, collection} from "firebase/firestore";
import {app,db,doc} from "../../firebaseConfig"



export default async function handler(req,res){
 
  const {id}={...req.body}
    let gecko={}
    let arrayforallPortfolioschart=[]
    let object ={}
    let totalBalance=0
    let totalPnl=0
    let allPortfoliosChange24h=0
    let AllportfoliosStatistics={}
  await getDocs(doc(db,"users",id,"portfolios")).then(async (response)=>{
     
  
    
  })
  
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