import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { LoginService } from '../services/userServices'
import { loginRequest } from "../actions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../assets/css/Login.css'
import BtnDarkMode from '../components/BtnDarkMode';

const Login = (props) => {

    const {dispatch} = useContext(AuthContext)
    const [form, setValues] = useState({});
    const [btnDisable, setBtnDisable] = useState(false)
    const [error, setError] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)

    const updateInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.email.length === 0 || form.password.length === 0) {
            setError(true)
        } else {
            setError(false)
            setBtnDisable(true)
            const result = await LoginService(form)
            if (result.statusText === "OK") {
                sessionStorage.setItem("crdt",result.data.refresh)
                const lastPath = sessionStorage.getItem('lastPath') || '/ventas' 
                dispatch(props.loginRequest(result.data));
                props.history.replace('/ventas');
            }else{
                setErrorLogin(true)
                setBtnDisable(false)
            }   
        }
    }

    useEffect(() => {
        const themeColor = JSON.parse(localStorage.getItem("darkMode"))
        if (themeColor) {
            document.body.classList.remove('is-light-mode')
            document.body.classList.add('is-dark-mode')
        }else{
            document.body.classList.remove('is-dark-mode')
            document.body.classList.add('is-light-mode')
        }
    }, [])

    return (
        <div className="container-login">
            <BtnDarkMode/>
            <h1 className="logo-name">SYNHO INVENTARIO</h1>
            <div className="container-form-login">
                <h2>Iniciar la sesión</h2>
                <hr style={{margin:"15px 0px 35px",borderColor:"var(--gray)"}}/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="user@domain.com" 
                        required={true}
                        id="email"
                        onChange={updateInput}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Introduzca su contraseña"
                        required={true}
                        id="password"
                        onChange={updateInput}
                    />

                    { error && <p className="error" >Completar los campos para iniciar sesión</p> }
                    { errorLogin && <p className="error" >Error al iniciar sesión, completar los campos correctamente</p> }

                    <button 
                        className="inicia-sesion-login" 
                        type="submit"
                        disabled={btnDisable}
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
            <div className="copy-right">Copyright © Synho {new Date().getFullYear()}</div>
        </div>
    )
}

const mapDispatchToProps = {
    loginRequest,
};

Login.propTypes = {
    loginRequest: PropTypes.func,
};
  
export default connect(null, mapDispatchToProps)(Login);