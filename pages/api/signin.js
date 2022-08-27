import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function handler(req, res) {
    const auth = getAuth();
    const {email,password}={...req.body};

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        res.status(200).json({...userCredential})
      })
      .catch((error) => {
        res.status(400).json({error})
      });


}