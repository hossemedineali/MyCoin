
import {app,db} from "../firebaseconfig"
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { Button, TextField } from "@mui/material"
import { Form } from "react-bootstrap"
import { Box } from "@mui/system"
import { useState } from "react"
//import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs,doc, getDoc,setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, query, where} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
const Test = () => {

  const uid=useSelector((state)=>state.auth.uid)

   
  
    const auth=getAuth()
    const[formValues,setformValues]=useState({email:'', password:''})


    const onchangehandler=(e)=>{
      const {name,value}=e.target
      
        setformValues({...formValues,
          [name]:value
        })
    }

    const user={
      id:1,
      firstName:'test',
      lastName:'test',
      
    
}


    async function test(){
        console.log(new Date().getTime())
        let updatecoin={
          id:new Date().getTime(),
          type:'buy5',
          qtty:1201,
          price:2250
        }

         let  uid='bWkKXzQJclfh4PTYsHVMCNuS7Wx2'
         let  portfolio='holding'
         let  coin="uno"
        

        

        let newdata

       await getDoc(doc(db,"users",uid,"portfolios",portfolio)).then(res=>{
        console.log(res.data())
        newdata=res.data()
       })
       
        if(newdata['eth']){
          console.log('new eth data :',newdata['eth'])
          const newdatafiltred= newdata['eth'].filter(item=>{
            if(item.id!=2){
              return item
            }
           })

           console.log('new eth data filtred :', newdatafiltred)

        }
       

       

       const docToUpdateref=doc(db,"users",uid,"portfolios",portfolio)
       
       updateDoc(docToUpdateref,coin,{})  //to add a new coin to portfolio

       updateDoc(docToUpdateref,{[coin]:arrayUnion(updatecoin)},{ merge: true }) //to add transaction to existing coin


       

        //        updateDoc(docToUpdateref,coin,{ merge: true })   //important

      
      //setDoc(docToUpdateref,{"btc": arrayUnion(updatecoin),},{ merge: true })
      //updateDoc(docToUpdateref,{"eth":[updateDoc]})

     // updateDoc(docToUpdateref,{ })




        /*
           methode:'post',
          url:'/api/AddCoinToPortfolio',
          data:info
        */

       /* await axios({
        method:'post',
        url:'/api/AddCoinToPortfolio',
        data:info
        }).then((response)=>{
          console.log(response)
        }) */
       // const docToUpdateref=doc(db,"users",id,"portfolios",portfolio)

        //updateDoc(docToUpdateref,{[{}]})

      

     /*  await getDocs(collection(db,"users",id,"portfolios")).then(response=>{
        //console.log(response)
        response.forEach((doc)=>{
          console.log(doc.id, " => ", doc.data());
          //data.push(doc.id)
          
        })

      })
 */
    




  }test()

  
  /* 
  async function test(){
      const querySnapshot = await getDocs(collection(db, "users",uid,"portfolios"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        console.log(doc)
      });




  }test()
  */

    





    const onSubmithundler=()=>{
      console.log('submit')
       async function sub(){
        await createUserWithEmailAndPassword(auth,formValues.email,formValues.password)
        .then((userCredential)=>{
          //res.status(200).json({...userCredential})
          console.log(userCredential)
          

          localStorage.setItem('token',userCredential.user.accessToken)

        })
        .catch((error)=>{
          //res.status(400).json({error})
        })
      }
     
      sub()
    }
    //createUserWithEmailAndPassword(auth,'test1@test.com','test123')
  return ( <Box>

  <form onSubmit={onSubmithundler}>
       <TextField
                  value={formValues.email}
                 
                 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onchangehandler}
                  onBlur={''}
                  onFocus={''}
                />

                <br/>
                <TextField
                  value={formValues.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onchangehandler}
                 
                />


    <Button  onClick={onSubmithundler} > submit</Button>

    </form>
  </Box> );
}
 
export default Test; 