import './App.css'
import { useState, useEffect } from 'react';

function App() {

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = import.meta.env.VITE_TOKEN;
  let email = "";
  let password = "";
  let full_name = "";
  const [result, setResult] = useState("")
  const [users, setUsers] = useState([])

  const onChangeEmail = (event) => {
    email = event.target.value;
  }

  const onChangePass = (event) => {
    password = event.target.value;
  }

  const onChangeFullName = (event) => {
    full_name = event.target.value;
  }

  const saveUser = async () => {

    event.preventDefault()

    let info = {
      email,
      password,
      full_name
    }

    const url = `${baseUrl}user_table`;
    const respose = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': token
      },
      body: JSON.stringify(info)
    });

    //200

    if (respose.ok) {
      setResult("User created!")
      getUsers()
    } else {
      setResult("User was not created!")
    }

  }

  const getUsers = async () => {
    const url = baseUrl + "user_table"
    const result = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': token
      }
    })

    console.log(result)

    const data = await result.json();
    console.log(data)
    if (data.length > 0) {
      setUsers(data)
    }

  }

  useEffect(()=>{
    getUsers()
  }, [])

  return (
    <>

      <main className="container mt-5">
        <h1>Create User</h1>

        <form onSubmit={saveUser}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type='email' className="form-control" onChange={onChangeEmail} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type='password' className="form-control" onChange={onChangePass} />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type='text' className="form-control" onChange={onChangeFullName} />
          </div>

          <button className='btn btn-success'>Save</button>
        </form>

        <p>{result}</p>

        <table className='table table-stripped'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item) => (
                <tr key={item.id}>
                  <td> {item.email}</td>
                  <td> {item.full_name}</td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </main>

    </>
  )
}

export default App
