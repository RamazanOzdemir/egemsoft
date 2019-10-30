import React,{useState,useContext} from 'react';
import '../scss/searchBarStyle.scss';
import { EmployeeContext } from '../context/EmployeeContext';

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const {employee,setSearcEmployee} = useContext(EmployeeContext);
    const handleSearch = (e)=>{
        const serachValue = e.target.value;
        setSearch(serachValue);
        if(serachValue.trim() !== ''){
            const searchWords = serachValue.toLowerCase().split(' ');
            const result = employee.filter(person=>{
                const fullname = (person.name.first + person.name.last).toLowerCase();
                return searchWords.filter(word=>word!==''?fullname.includes(word):false).length>0;
            });
            setSearcEmployee(result.length===0?['bulunamadı']:result);
        }
        else {
            setSearcEmployee([]);
        }


        
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSearch('');
    }
    return (
        <div className='search search--bg'>
            <i className='material-icons search__icon'>search</i>
            <form onSubmit={handleSubmit}>
                <input type='text' value={search} onChange={handleSearch} placeholder='Search' className='search__input search--bg'></input>
            </form>
        </div>
    )
}

export default SearchBar
