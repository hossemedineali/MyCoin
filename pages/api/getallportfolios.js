import axios from "axios";
import {getDocs, doc, setDoc,addDoc,updateDoc,arrayUnion,arrayRemove,deleteDoc ,deleteField, collection} from "firebase/firestore";
import {app,db} from "../../firebaseConfig"



export default async function handler(req,res){
 
  const {id}={...req.body}
    
    let arrayforallPortfolioschart=[]
    let object ={}
    let totalBalance=0
    let totalPnl=0
    let allPortfoliosChange24h=0
    let AllportfoliosStatistics={}
  await getDocs(collection(db,"users",id,"portfolios")).then(async (response)=>{
     
  
    
    response.forEach((doc)=>{
      let portfoliototalinvested=0
      let portfolioName=doc.id
      object[portfolioName]={statistics:{},coins:{}}
      

     
      for(const key in doc.data()){
        let totalcoinholding=0;
        let totalspentoncoin=0;
        let totalCost=0;
        let totalProceeds=0
        const currentcoin=doc.data()[key]
        for(const item in currentcoin){
          //array.push(item)
         
          if(currentcoin[item].type=='buy'){
            totalcoinholding+=currentcoin[item].quantity
            totalspentoncoin+=currentcoin[item].quantity*currentcoin[item].pricePerCoin
            totalCost+=currentcoin[item].quantity*currentcoin[item].pricePerCoin
          }else{
            totalcoinholding-=currentcoin[item].quantity
            totalspentoncoin-=currentcoin[item].quantity*currentcoin[item].pricePerCoin
            totalProceeds+=currentcoin[item].quantity*currentcoin[item].pricePerCoin
          }
          
        }
        portfoliototalinvested+=totalspentoncoin
        
        object[portfolioName]['statistics']={...object[portfolioName]['statistics'],portfoliototalinvested}
   
        object[portfolioName]['coins'][key]={'db':{...currentcoin},totalcoinholding,totalspentoncoin}
      }

    })
    
  }).then(async()=>{
    for(const key in object){
    
    let portfoliototalbalance=0
    let portfolioPnl=0
    for(const coin in object[key]['coins']){
      console.log('coin for fetching data',coin)
      let testobj={}
        await axios.get('https://api.coingecko.com/api/v3/coins/'+coin).then(response=>{
          const coindata={
            id:response.data.id,
                    symbol:response.data.symbol,
                    market_cap_rank:response.data.market_cap_rank,
                    image:response.data.image.small,
                    price:response.data.market_data.current_price.usd,
                    h1:response.data.market_data.price_change_percentage_1h_in_currency.usd,
                    h24:response.data.market_data.price_change_percentage_24h,
                    d7:response.data.market_data.price_change_percentage_7d,
                    market_cap:response.data.market_data.market_cap.usd,
                    id_symbol:{
                        id:response.data.id,
                        symbol:response.data.symbol,
                        price:response.data.market_data.current_price.usd,
                        
                    }
          }

          
         arrayforallPortfolioschart.push({'coin':coin,quantity:object[key]['coins'][coin].quantity,price:coindata.price})
          let coincurrentvaluation=object[key]['coins'][coin].totalcoinholding*coindata.price
          let pnl=coincurrentvaluation-object[key]['coins'][coin].totalspentoncoin
          portfoliototalbalance+=coincurrentvaluation;
          portfolioPnl=portfoliototalbalance-object[key]['statistics'].portfoliototalinvested

          let portfolioPnlPercentage= portfoliototalbalance>object[key]['statistics'].portfoliototalinvested? object[key]['statistics'].portfoliototalinvested/portfoliototalbalance:portfoliototalbalance/object[key]['statistics'].portfoliototalinvested
               
          object[key]['coins'][coin]={...object[key]['coins'][coin],coindata,coincurrentvaluation,pnl,id:coindata.id}
          object[key]['statistics']={...object[key]['statistics'],portfoliototalbalance,portfolioPnl,portfolioPnlPercentage}

          

        })
        
      }
      //
      if(object[key]['statistics'].portfoliototalbalance){

        totalBalance+=object[key]['statistics'].portfoliototalbalance
      }
      if(object[key]['statistics'].portfolioPnl){

        totalPnl+=object[key]['statistics'].portfolioPnl
      }
   }
   
  
  }).then(

   ()=> {
   for(const key in object ){
    let portfolio24hchange=0
     for (const coin in object[key]['coins']){
      

       let coinPercentageOfPortfolio=object[key]['coins'][coin].coincurrentvaluation/object[key]['statistics'].portfoliototalbalance
      
      portfolio24hchange+=object[key]['coins'][coin].coindata.h24*coinPercentageOfPortfolio
       object[key]['coins'][coin]={ ...object[key]['coins'][coin],coinPercentageOfPortfolio}
      }
      let portfolioPercentageOfAllPortfolios=object[key]['statistics'].portfoliototalbalance/totalBalance
      object[key]['statistics']={...object[key]['statistics'],portfolio24hchange,portfolioPercentageOfAllPortfolios}
    //
      if(object[key]['statistics'].portfolio24hchange*object[key]['statistics'].portfolioPercentageOfAllPortfolios){
        allPortfoliosChange24h+=object[key]['statistics'].portfolio24hchange*object[key]['statistics'].portfolioPercentageOfAllPortfolios
      }
   }

   
    AllportfoliosStatistics={
     allPortfoliosChange24h,
     totalBalance,
     totalPnl
    }
   }
  ).then(()=>{
    console.log(AllportfoliosStatistics)
    res.status(200).json({object,AllportfoliosStatistics,arrayforallPortfolioschart})
   
    
  })
  /* .catch(err=>{
    //res.status(400).json({err})
  }) */
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