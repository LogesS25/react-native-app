import {  createContext,useContext,useEffect,useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

//new hook, which is basically a call back function 
//that simply calls useContext hook and specifies which context we want to use 
export const useGlobalContext = () => useContext(GlobalContext);

//but something has to provide the context
//this is typically a react component 

const GlobalProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res);
            }
            else{
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        // finally - no matter what happends if we succed or fail
        .finally(()=>{
            setIsLoading(false);
        })
    },[]);
    return(
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading   
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export default GlobalProvider;