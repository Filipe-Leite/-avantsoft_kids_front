import { Link } from "react-router-dom";
import * as URL from '../../api/requestRequirements';


export default function SignIn(){


    return(
        <div id='container-sigin-page'>
            <div id='container-sigin-fields'>
                <h1>Login</h1>
                <div>
                    <label>e-mail</label>
                    <input/>
                </div>
                <div>
                    <label>password</label>
                    <input/>
                </div>
                <div>
                    <button> Login</button>
                    <Link to={URL.SIGNUP_ENDPOINT}> Sign Up</Link>
                </div>
            </div>
        </div>
    )
}