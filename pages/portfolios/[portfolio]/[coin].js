
const Transactions = () => {
    return ( <h1>Transactions</h1> );
}
 

export async  function getServerSideProps(ctx){
    console.log('ctx',ctx)
    return{
        props:{

        }
    }
}
export default Transactions;