import { Link, useNavigate } from "react-router-dom";
import * as URL from '../../../api/requestRequirements';
import { useState } from "react";
import { signUpUser } from "../../../../features/session/sessionSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SignUp(){
    const [formData, setFormData] = useState({
                                                email: '',
                                                password: ''
                                            });
    
    const dispatch = useDispatch<AppDispatch>();
    const errorsMessages = useSelector((state: RootState) => state.session.errorMessages);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const { name, value } = event.target;
                                                                                setFormData(prev => ({
                                                                                    ...prev,
                                                                                    [name]: value
                                                                                }));
                                                                                console.log(formData)
                                                                            };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.email === '' || formData.password === '') {
            toast.error('Fill all fields!');
            return;
        }

        const response = await dispatch(signUpUser({
                                                    email: formData.email,
                                                    password: formData.password
                                                    }));

        if (response.meta.requestStatus === 'fulfilled') {
            toast.success("User Created")
        } else if (response.meta.requestStatus === 'rejected' && errorsMessages ){
            console.log("errorsMessages >> ", errorsMessages)
            errorsMessages.map((item: string) => {toast.error(item)})
        } else {
            toast.error('Some error has ocurred')
        }
    };

    return(
        <div id='container-sigin-page'>
            <div id='container-sigin-fields'>
                <h1>Sign Up</h1>
                <div>
                    <label>e-mail</label>

                    <input  
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>password</label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}> Confirm</button>
                    <Link to={URL.SIGNIN_ENDPOINT}> Sign in</Link>
                </div>
            </div>
        </div>
    )
}