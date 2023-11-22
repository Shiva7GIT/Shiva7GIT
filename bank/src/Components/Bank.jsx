import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import "./Bank.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const Bank=()=> {
  
  const name = useRef(null)
  const type = useRef(null)
  const balance = useRef(null)
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [balanceError, setBalanceError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [showForm,setShowForm] = useState(false)
  const [showAccounts,setShowAccounts] = useState(false)
  const [account,setAccount] = useState([])
  
  const handleSubmit = async () => {
    if (formValid) {
      const data = await axios.post("http://localhost:3000/accounts/open", {
        name: name.current.value,
        type: type.current.value,
        balance: balance.current.value,
      });
    }
  };
  
  const handleNameChange = () => {
    const value = name.current.value.trim();
    setNameError(value ? "" : "Name is required");
    validateForm();
  };
  
  const handleTypeChange = () => {
    const value = type.current.value.trim();
    setTypeError(value ? "" : "Type is required");
    validateForm();
  };
  
  const handleBalanceChange = () => {
    const value = balance.current.value;
    setBalanceError(value >= 0 ? "" : "Balance must be non-negative");
    validateForm();
  };

  const validateForm = () => {
    const nameValue = name.current.value.trim();
    const typeValue = type.current.value.trim();
    const balanceValue = balance.current.value;
  
    setFormValid(nameValue && typeValue && balanceValue !== "" && parseFloat(balanceValue) >= 0);
  
    setNameError(nameValue ? "" : "Name is required");
    setTypeError(typeValue ? "" : "Type is required");
    setBalanceError(balanceValue !== "" && parseFloat(balanceValue) >= 0 ? "" : "Balance must be non-negative");
  };
  
  
  
  const getData= async ()=>{
    const data = await axios.get("http://localhost:3000/accounts")
    setAccount(data.data)
    console.log(data)
  }

  useEffect(()=>{
    getData();
  },[])

  const activateAcc = async (accountNumber)=>{
    const data = await axios.put(`http://localhost:3000/accounts/${accountNumber}/activate`)
    getData()
  }

  return(
    <>
     
      <h1>SUNRISES BANK</h1>
      
      <div>
        <button style={{borderRadius:'5px'}}onClick={() => { setShowForm(true); setShowAccounts(false); }}>Open Account</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button style={{borderRadius:'5px'}}onClick={() => { setShowAccounts(true); setShowForm(false); }}>Accounts</button>
      </div>

    
      {showForm &&( 
        <div className='popup'>
        <form>
            <button className="closef-btn" onClick={()=>setShowForm(false)}>X</button>
            Name <input type="text" ref={name} onChange={handleNameChange} />
            Type <input type="text" ref={type} onChange={handleTypeChange} />
            Balance <input type="number" ref={balance} onChange={handleBalanceChange} />
            <button style={{borderRadius:'5px'}} onClick={handleSubmit} disabled={!formValid}>Submit</button>       
        </form>
    </div>
    )}
      
      {
        showAccounts && (
          <div className="accounts-table-container">
            <button className="closef-btn" onClick={()=>setShowAccounts(false)}>X</button>
          <table>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                account[0]?(
                  account.map((el)=>{
                    return(<tr>
                      <td>{el.accountNumber}</td>
                      <td>{el.name}</td>
                      <td>{el.type}</td>
                      <td>{el.status}</td>
                      <td>{el.balance}</td>
                      {el.status === 'pending' && (
                      <td><button className="active"onClick={()=>activateAcc(el.accountNumber)}>activate</button></td>
                      )}
                      {el.status === 'active' && (
                      <td>active</td>
                      )}
                      
                      
                    </tr>)
                  })
                  ):(
                    <p>No data</p>
                  ) 
              }
            </tbody>
          </table>
          </div>
        )
      }
     
    </>
  )
}
export default Bank;
