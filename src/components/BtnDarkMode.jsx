import React, { useState } from 'react'

const BtnDarkMode = () => {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false)

    const handleMode = async (event) => {
        if (event.target.checked) {
            localStorage.setItem("darkMode",true)
            setDarkMode(true)
            document.body.classList.remove('is-light-mode')
            document.body.classList.add('is-dark-mode')
        }else{
            localStorage.setItem("darkMode",false)
            setDarkMode(false)
            document.body.classList.remove('is-dark-mode')
            document.body.classList.add('is-light-mode')
        }
    }

    return (
        <div className="dark-mode">
            <p className="dark-mode-title">
                {darkMode
                    ? "Dark Mode"
                    : "Light Mode"
                }
            </p>
            <input 
                type="checkbox" 
                className="checkbox" 
                id="checkbox"
                defaultChecked={darkMode}
                onChange={handleMode}
            />
            <label className="switch" htmlFor="checkbox">
            </label>
        </div>
    )
}

export default BtnDarkMode
