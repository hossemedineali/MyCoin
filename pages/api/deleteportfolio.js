//       /api/deleteportfolio

import { async } from "@firebase/util";
import { doc, deleteDoc } from "firebase/firestore";
import {app,db} from "../../firebaseConfig"

export default async function handler(req,res){
    const {id,portfolioid}={...req.body}

    await deleteDoc(doc(db, "users", id,'portfolios',portfolioid));
    res.status(200).json({id,portfolioid})
}

//await deleteDoc(doc(db, "cities", "DC"));