import React,{useContext,useState,useEffect} from 'react';
import uuid from 'uuid/v1';
import '../scss/style.scss';
import SearchBar from './SearchBar';

//import '../style.css'
import { EmployeeContext } from '../context/EmployeeContext';

const Table = () => {
    const [date,setDate] = useState({start:0,finish:7});
   
    const {employee,serachEmployee} = useContext(EmployeeContext);
    const willBeShown = serachEmployee.length>0 ? serachEmployee : employee;
    const w = window.innerWidth;
    let heads;
    if(w>720)
      heads = [1,2,3,4,5,6,7];
    else
        heads = [1];
    useEffect(()=>{
        if(w<720)
            setDate({start:0,finish:1});
    },[w]);
    const handleDate = (direction)=>{
        if(direction){
            let newDate; 
            if(date.finish-date.start === 1 && date.start ===30 )
             newDate= {start:0,finish:1}; 
            else if(date.finish-date.start === 7 && date.start ===28 )
             newDate= {start:0,finish:7};
            else
             newDate= {start: date.finish,finish: date.finish+(date.finish-date.start)};
            setDate(newDate)
        }
        else{
            let newDate; 
            if(date.finish-date.start === 1 && date.start ===0 )
             newDate= {start:30,finish:31}; 
            else if(date.finish-date.start === 7 && date.start ===0 )
             newDate= {start:28,finish:35};
            else
             newDate= {start: date.start-(date.finish-date.start),finish:date.start};
            setDate(newDate)
        }
    };
    return (
      
        <table id="my-table" className="display nowrap" cellSpacing="0">
              <caption>
                  <div>
                    <SearchBar/>
                    <button onClick={handleDate.bind(this,false)}><i className="material-icons">arrow_back_ios</i></button>
                    <button onClick={handleDate.bind(this,true)}><i className="material-icons">arrow_forward_ios</i></button>
                  </div>
                
               </caption>
            <thead>
             <tr>
               <th>Çalışanlar</th>
               {
                   heads.map(head=>(
                       <th key={uuid()}>{date.start+head + ' Ağustos'}</th>
                   ))
               }
             </tr>
           </thead>
           <tbody>
               {
                   willBeShown.map(person=>{
                       if(!person.name)
                            return(
                                <tr>
                                 <td className="employee-col">
                                     <p className="name">Aradığınız kriterlerde çalışan bulunamadı</p>
                                 </td>
                                </tr>
                            )
                        else
                            return(
                               <tr key={uuid()}>
                                 <td className="employee-col">
                                     <img src={person.picture.thumbnail} alt='' align="left"/>
                                     <p className="name">{person.name.first+' '+person.name.last}</p>
                                     <p className="title">Visual Designer</p>
                                     <p className="timezone">UTC + 3 (İstanbul)</p>
                                 </td>
                                 {
                                     person.dates.map((item,index)=>{
                                         if(index>=date.start && index<date.finish)
                                         return(
                                       <td key={uuid()}>
                                           {
                                               item.hours.map((commitment,index)=>{
                                                   return (
                                                 <div key={uuid()} className={`commitment ${item.style}`}>
                                                     <div className='d'style={{width:item.hoursmeter[index]}}>
                                                        <span className="hoursmeter" ></span>
                                                     </div>
                                                     <p className="type">{item.type[index]}</p>
                                                     <p className="percent">{item.hoursmeter[index]}</p>
                                                 </div>
                                               )})
                                           }

                                       </td>
                                     )
                                     else return null
                                    
                                    }
                                     
                                     )
                                 }
                                </tr>
                            )
                    })
               }
           </tbody>
        </table>
    )
}

export default Table;
