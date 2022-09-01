import {getDocs, doc, setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, collection} from "firebase/firestore";
import {app,db} from "../../firebaseConfig"

export default async function handler(req,res){
    
    let id=+req.body.id
    let uid=req.body.id
    let id2=id.toString()
    let data=[]
          //'aJCcdas2SfXlOTFGqvkx1a0iNCN2'

    await getDocs(collection(db,"users",uid,"portfolios")).then(response=>{
      console.log(response)
      response.forEach((doc)=>{
        console.log(doc.id, " => ", doc.data());
        data.push(doc.id)
        
      })
      res.status(200).json({data})
     })
    //let data=[]
   /*  const querySnapshot = await getDocs(collection(db, "users",uid,"portfolios"));
                          if(querySnapshot){

                            querySnapshot.forEach((doc) => {
                              // doc.data() is never undefined for query doc snapshots
                              data.push(doc.data())
                              console.log(doc.id, " => ", doc.data());
                              
                              console.log(doc)
                            }); 
                          } */
                          /* try {
                            const querySnapshot = await getDocs(collection(db, "users",uid,"portfolios","holding"));
                          if(querySnapshot){

                            querySnapshot.forEach((doc) => {
                              // doc.data() is never undefined for query doc snapshots
                              data.push(doc.data())
                              console.log(doc.id, " => ", doc.data());
                              res.status(200).json({data})
                              console.log(doc)
                            }); 
                          }
                          } catch (error) {
                            console.error(error);
                            res.status(200).json({message:'test test test',error})
                            // expected output: ReferenceError: nonExistentFunction is not defined
                            // Note - error messages will vary depending on browser
                          }
 */




    

  
   
  
    
}






/* 
  await getDocs(collection(db, "users",uid,"portfolios")).then(res=>{
      res.status(200).json({message:'test test test',})
    }).catch(error=>{
      res.status(400).json(error)
    })
*/

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