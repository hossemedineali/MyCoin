import Navbar from "./NavBar";


const Layout = ({children}) => {
    return ( 
        <>
       <Navbar/>
        <main>{children}</main>
       
      </>
     );
}
 
export default Layout;