import React, { useState } from 'react'
import axios from 'axios';
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {

    const [keyword,setKeyword] = useState('');
    const [results,setResults] = useState([]);

    //hook
    const [values,setValues] = useSearch();

    const navigate = useNavigate();


    const handleSubmit  = async(e)=>{
        e.preventDefault();
        try {
            // console.log("hhhh",keyword);
            const {data} = await axios.get(`/product/search/${values?.keyword}`);

            // console.log("miller",data);
            setResults(data.products)
            setValues({...values,results:data.products})
            
            setKeyword('');
            navigate("/search")
            
            
        } catch (err) {
            console.log(err)
            setKeyword('')
            
        }
    }

  return (
      <form className="d-flex gap-2" onSubmit={handleSubmit}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search fresh items..."
                style={{ width: "170px", borderRadius: "20px" }}
                // onChange={(e)=>setKeyword(e.target.value)}
                onChange={(e)=>setValues({...values,keyword:e.target.value})}
                value={values.keyword}
              />
              <button
                className="btn btn-warning btn-sm fw-semibold"
                style={{ borderRadius: "20px" }}
              >
                Search{values.results.length}
              </button>
            </form>
  )
}

export default SearchForm