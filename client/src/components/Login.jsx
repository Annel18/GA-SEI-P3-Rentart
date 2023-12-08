import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"

export default function Login(){
  //State
  const [ noBueno, setNoBueno ] = useState('')
  // navigation
  const navigate = useNavigate()
  // State from App
  const data = useOutletContext()
  const setUserData = data[1]
  const userData = data[0]
  //! console log turns udefined! Why?


  async function submitData(parsedData){
    try {
      console.log(userData)
      // Get logged in
      const res = await axios.post('/api/login', parsedData)
      // Save data
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('usertype', res.data.usertype)

      setUserData([res.data.token, res.data.username])
      // Go to homepage
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  function authenticate(e){
    e.preventDefault()
    // Defining variables for validation
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    const formKeys = []
    let str = ''
    
    // validating every field has been fulfilled
    for (const [key, value] of Object.entries(parsedData)) {
      if (!value) formKeys.push(key)
    }
    if (formKeys.length > 0){
      // If empty values were found we make a string with them to add to an error message
      formKeys.map(val => str = `${str}${val} ,`)
      str = str.substring(0, str.length - 2)
      return setNoBueno('You need to fill in: \n' + str)
    } else {
      setNoBueno('')
    }

    submitData(parsedData)

  }

  return (
    <fieldset>
      {/* If user doesen't fill one or more of the fields a warning appears */}
      {noBueno && <section className="nobueno"><p>{noBueno}</p></section>}
      <legend>Account Login</legend>
      <form action="#" onSubmit={authenticate}>
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
    </fieldset>
  )
}