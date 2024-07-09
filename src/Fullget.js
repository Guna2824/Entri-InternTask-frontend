import React,{useState, useEffect} from 'react'
import axios from "axios";
import './App.css'

function Fullget() {
    const [getData, setGetData] = useState([]);
    const [sold, setSold] = useState('');
    const [unSold, setUnSold] = useState();
    const [amount, setAmount] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [month, setMonth] = useState('allmonth')
    const [search, setSearch] = useState('')

    useEffect(()=>{
        const data = async() => {
            const response = await axios.get(`http://localhost:4008/api1/${month}data`)
            // console.log(response.data)
            setGetData(response.data)
        }
        data()
    },[month, search])

    useEffect(()=>{
        const dataOne = async() => {
            const response = await axios.get(`http://localhost:4008/api2/${month}soldyes`)
            // console.log(response.data)
            setSold(response.data)
        }
        dataOne()
        const dataTwo = async() => {
            const response = await axios.get(`http://localhost:4008/api2/${month}soldno`)
            // console.log(response.data)
            setUnSold(response.data)
        }
        dataTwo()
        const dataThree = async() => {
            const response = await axios.get(`http://localhost:4008/api2/${month}amount`)
            // console.log(response.data)
            setAmount(response.data)
        }
        dataThree()

    },[month])


    const filterData = getData.filter((item)=> item.category.includes(search))   

    const recordPerPage = 10;
    const lastIndex = currPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = search !== '' ? filterData.slice(firstIndex, lastIndex) : getData.slice(firstIndex, lastIndex);
    const nPage = search !== '' ? Math.ceil(filterData.length / recordPerPage) : Math.ceil(getData.length / recordPerPage);
    const numbers = [...Array(nPage+1).keys()].slice(1);

//  console.log(currPage)

    return (
    <div className='main-div'>
        <div>
        <div>
         <h2>Table - All Data</h2>
         <div className='search-items-main'>
            <div className='search-items'>
                <div className='search-items'>
                    <input type='text' value={search} placeholder='search by category' onChange={(e)=>setSearch(e.target.value)}/>
                    <button className='navic' onClick={()=>setSearch('')}>clear</button>
                </div>
            <select onChange={(e)=>setMonth(e.target.value)}>
                <option value='allmonth'>All month</option>
                <option value='sept'>September 2021</option>
                <option value='oct'>Octomber 2021</option>
                <option value='nov'>November 2021</option>
                <option value='dec'>December 2021</option>
                <option value='jan'>January 2022</option>
                <option value='feb'>Febrary 2022</option>
                <option value='march'>March 2022</option>
                <option value='april'>April 2022</option>
                <option value='may'>May 2022</option>
                <option value='june'>June 2022</option>
                <option value='july'>July 2022</option>
                <option value='aug'>Augest 2022</option>
            </select>
            </div>
            <div className='report-card'>
               <p> Month: <strong> {month.toUpperCase()} </strong> </p>
               <p> Total Sales = <strong> Rs. {amount}.00 </strong></p>
               <p> Sold Items = <strong> {sold > 1 ? sold+' Nos' : sold+' No' } </strong></p>
               <p> Unsold Items = <strong> {unSold > 1 ? unSold+' Nos' : unSold+' No'} </strong></p>

            </div>
            </div>
            </div>
        </div>
        <div className='table-div'>
         <table className='table'>
            <thead>
                <tr>
                <th>Sl.No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>DateOfSale</th>
                <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {records.map((d, i)=> 
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{d.title}</td>
                    <td style={{fontSize:'12px'}}>{d.description}</td>
                    <td>{Math.ceil(d.price)}</td>
                    <td>{d.category}</td>
                    <td>{d.sold ? 'yes' : 'no'}</td>
                    <td>{dateMethod(d.dateOfSale)}</td>
                    <td><img style={{height:'75px', width:'75px'}} src={d.image} alt='pic' /></td>
                    </tr>
                )}
            </tbody>
            </table>

            <div className="pagination">
    <button onClick={prePage} disabled={currPage === 1}>&laquo;</button>
    {numbers.map((d, i) => (
      <button
        key={i}
        className={`pagination-button ${currPage === d ? 'active' : ''}`}
        onClick={() => changeCPage(i)}
      >
        {d}
      </button>
    ))}
    <button onClick={nextPage} disabled={currPage === nPage}>&raquo;</button>
  </div>
        </div>

    </div>
  )

  
 function prePage () {
    if(currPage !== 1){
        setCurrPage(currPage -1)
    }
}

function changeCPage (id) {
    setCurrPage(id+1)
}

function nextPage () {
    if(currPage !== nPage){
        setCurrPage(currPage +1)
    }
}

}



export default Fullget


const dateMethod = (date) => {
    const getdt = new Date(date)
    const dt = getdt.getDate()
    const month = getdt.getMonth()+1
    const year = getdt.getFullYear()
    return dt+'-'+month+'-'+year
}