import React,{createContext,useEffect,useState} from 'react'

export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
    const [employee,setEmployee] = useState([]);
    const [serachEmployee,setSearcEmployee] = useState([]);
    useEffect(()=>{
    const setCommitment = ()=>{
        if(Math.round(Math.random())){
            switch(Math.floor(Math.random()*3)){
                case 0:
                    return{
                        style:'assigned',hoursmeter:['100%'],hours:['8 Saat'],type:['Şirket 1']
                    }
                case 1:
                    return{
                        style:'assigned',hoursmeter:['50%','50%'],hours:['4 Saat','4 Saat'],type:['Şirket 1','Müşteri']
                    }
                default:
                    return{
                        style:'assigned',hoursmeter:['50%','25%','25%'],hours:['4 Saat','2 Saat','2 Saat'],type:['Şirket 1','Müşteri','Müşteri']
                    }
            }
        }
        else{
            return {style:'pto',hoursmeter:['100%'],hours:['8 Saat'],type:['Ücretli İzin']}
        }
    };
    const setDate = ()=>{
        const arr = [];
        for(let i = 0 ; i<31  ; i++)
            arr[i] = setCommitment();
        return arr;
    };
    //employee.forEach(emp=>{emp.dates=setDate()});
    
        fetch("https://randomuser.me/api/?results=10&nat=tr")
        .then(x=>x.json())
        .then(y=>{
            const z = y.results;
            z.forEach(emp=>{emp.dates=setDate()});
            setEmployee(z);
        
        })
        .catch(e=>console.error(e));
    },[]);
    return (
        <EmployeeContext.Provider value={{employee,serachEmployee,setSearcEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;
