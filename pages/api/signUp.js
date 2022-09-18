import {app,db} from "../../firebaseConfig"
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { doc, setDoc,addDoc, collection } from "firebase/firestore";
  
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const nameregex=/^[a-z ,.'-]+$/i;

export default async function handler(req, res) {
  const auth = getAuth();
  //const  {firstName,LastName,email,password}=req.body
  const data={...req.body}
  let err={}
  let errorMessages={}
  let isError=false

  for (var key in data){
    /* check if fields are empty */
    if (data[key]==''){
      err[key]=true
      errorMessages[key]='please enter your '+key
      isError=true
    }else 
        /*validate  fields if not empty and not valid */
      {
       if(key=='firstName'||key=='lastName'){
        if(data[key].length<3||data[key]>10||!nameregex.test(data[key])){
          err[key]=true
          errorMessages[key]=key+" must contain 3 to 10 letters and can't have a special caracters or numbers"
          isError=true
        }
    }else if(key=='email'){
        if(!emailregex.test(data[key])){
          err[key]=true
          errorMessages[key]="Please enter a valid email"
          isError=true
        }
    }
    else if (key=='password'){
        if(!passwordregex.test(data[key])){
          err[key]=true
          errorMessages[key]="Password must have Minimum eight characters, at least one letter and one number"
          isError=true
        }
    }
    }
  }
  

  
  if(isError){
    res.status(400).json({message:'invalid input',err,errorMessages})
  }else {

    await createUserWithEmailAndPassword(auth,data.email,data.password)
    .then(async(userCredential)=>{
        const user={
                  uid:userCredential.user.uid,
                  firstName:req.body.firstName,
                  lastName:req.body.lastName,
                  
        }
    
     await  setDoc(doc(db,"users",userCredential.user.uid,"portfolios",'My Portfolio'),{})
     // last active
        //setDoc(doc(db,userCredential.user.uid,"portfolios","My portfolio"),{})
     .then(()=>{

       res.status(200).json({...userCredential,test:user})
    })
      
    })
    .catch((error)=>{
      //res.status(400).json({error})
      res.status(400).json(error)
    })
    


  }
   
  
 
}


