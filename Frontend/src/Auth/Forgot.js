import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProcessSpinner from '../Components/Spinners/ProcessSpinner';
import { exception_handler } from '../Exception';
import { createAuthContext } from './AuthContext';


const Forgot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const { forgot_password, reset_code_operation } = useContext(createAuthContext);
    const [resetCode, setResetCode] = useState(false);
    const [code, setCode] = useState(0);
    const [password, setPassword] = useState('');



    const forgot_action = () => {
        setLoader(true);
        forgot_password(email).then(() => {
            setLoader(false);
            setResetCode(true);
        }).catch((err) => {
            setLoader(false);
            console.log('hi');
            console.log(err);
        })
    };

    const reset = () => {
        setLoader(true);
        reset_code_operation(email, code, password).then((el) => {
            console.log(el);
            toast.success('Password Reset Successfully!');
            setLoader(false);
            setTimeout(() => {
                navigate('/auth');
            }, 1500);
        }).catch((err) => {
            setLoader(false);
            toast.error(exception_handler(err.code));
        });
    };

    return <div className="section--login">
        <h1>Forgot Password?</h1>
        <p>Type your registered email!</p>
        <form className="login_card">
            <div className="col-8">
                <label className="form-label">Email Address</label>
                <input value={email} className="form-control"
                    onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            {
                resetCode ? <>
                    <div className="col-8 mt-3">
                        <label className="form-label">Code</label>
                        <input className="form-control"
                            onChange={(e) => setCode(e.target.value)} type="email" />
                    </div>
                    <div className="col-8 mt-3">
                        <label className="form-label">New Password</label>
                        <input className="form-control"
                            onChange={(e) => setPassword(e.target.value)} type="email" />
                    </div>
                    <div className="col-8 mt-3">
                        <label className="form-label">Verify</label>
                        <input className="form-control"
                            onChange={(e) => setPassword(e.target.value)} type="email" />
                    </div>
                </>
                    : null
            }
            <div className="col-8 signin--btn" onClick={() => resetCode
                ? reset()
                : forgot_action()}>
                <button type="button" className="btn">
                    {loader ? <ProcessSpinner /> : 'Sign In'}
                </button>
            </div>
        </form>
    </div>
}

export default Forgot;
