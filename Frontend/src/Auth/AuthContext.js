import React, { createContext } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import { getData, sendData } from '../Utils/API';


const createAuthContext = createContext();

var userPool = new CognitoUserPool({
    UserPoolId: "ap-south-1_qLkXcua4B",
    ClientId: "2pq4j37blp4ki285mr7acfb1nr",
});



const AuthContext = ({ children }) => {
    const [cookie, , removeCookie] = useCookies();

    // ********************************* Utilites ****************************************
    const check_code = (value) => {
        var regex = /^[0-9]{6,6}$/
        if (!value) return 'The Filed is required!';
        else if (!regex.test(value)) return 'Not Valid Code';
    };
    const getCode = async (username, code) => {
        const User = new CognitoUser({
            Username: username,
            Pool: userPool
        });
        return new Promise((resolve, reject) => {
            User.confirmRegistration(code, true, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else resolve('Success');
            });
        });
    };
    const verify_modal = async (username) => {
        return Swal.fire({
            title: 'Verify Email',
            input: 'text',
            inputLabel: 'Check your mail for Verfication Code!',
            inputPlaceholder: 'Enter email address here',
            confirmButtonColor: '#00bfa6',
            confirmButtonText: 'Verify',
            inputValidator: (value) => check_code(value),
            allowOutsideClick: false,
            preConfirm: (code) => {
                return getCode(username, code).catch(() => Swal.showValidationMessage('Invalid Code, Try Again!'));;
            }
        }).then(() => {
            Swal.close();
        });
    };
    const resetCode = (username) => {
        const User = new CognitoUser({
            Username: username,
            Pool: userPool
        });
        return new Promise((resolve, reject) => {
            User.resendConfirmationCode((err, data) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    // ************************** SignIn *******************************************
    const sign_in = async (email, password) => {
        email = email.toLowerCase();
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: email,
                Pool: userPool,
            });
            const authDetails = new AuthenticationDetails({
                Password: password,
                Username: email,
            });
            user.authenticateUser(authDetails, {
                onSuccess: async (res) => {
                    console.log(res);
                    let { jwtToken } = res.idToken;
                    try {
                        let { data: { isAdminApprove, user_role, fullname } } = await getData(`/get_admin_approve?id=${email}`, 'GET');
                        if (!isAdminApprove && user_role !== 'admin') return reject({ code: "isAdminApprove" });
                        resolve({ email, fullname, user_role, jwtToken });
                    }
                    catch (err) { reject(err) };
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    };

    // ************************** Registration ***************************************
    const sign_up = async ({ username, password, user_role, isAdminApprove, data_items }) => {
        return new Promise((res, rej) => {
            userPool.signUp(username, password, null, null, async (err, data) => {
                if (err) {
                    rej(err);
                }
                else {
                    await sendData('/auth', 'POST', {
                        username, user_role, isVerified: false, isAdminApprove, ...data_items
                    });
                    verify_modal(username).then(() => res()).catch(err => rej(err));
                }
            });
        });
    };
    // ************************** Forgot Password ********************************
    const forgot_password = async (email) => {
        return await new Promise((res, rej) => {
            const user = new CognitoUser({
                Username: email,
                Pool: userPool,
            });
            user.forgotPassword({
                onSuccess: function (data) {
                    console.log(data);
                    res();
                },
                onFailure: function (err) {
                    console.log(err);
                    rej(err);
                },
            });
        })
    };
    // ************************** Reset Code Password ********************************
    const reset_code_operation = async (email, code, newPassword) => {
        return await new Promise((res, rej) => {
            const user = new CognitoUser({
                Username: email,
                Pool: userPool,
            });
            user.confirmPassword(code, newPassword, {
                onSuccess() {
                    res();
                },
                onFailure(err) {
                    rej(err);
                    console.log(err);
                },
            });
        });
    };

    const update_password = async (oldpass, newpass) => {
        return await new Promise((res, rej) => {
            var cogntioUser = userPool.getCurrentUser();
            if (cogntioUser != null) {
                return cogntioUser.getSession(function (err) {
                    if (err) rej(JSON.stringify({ code: null }));
                    return cogntioUser.changePassword(oldpass, newpass, function (err, result) {
                        if (err) return rej(JSON.stringify(err))
                        else res('Password Successfully Updated');
                    });
                })
            }
            return rej(JSON.stringify({ code: null }));
        })
    }


    // *************************** Logout *************************************
    const logout = () => {
        removeCookie('user_data', { path: '/' });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return <createAuthContext.Provider value={{
        sign_in,
        sign_up,
        forgot_password,
        reset_code_operation,
        logout,
        verify_modal,
        resetCode,
        cookie,
        update_password
    }}>
        {children}
    </createAuthContext.Provider>
}

export { AuthContext, createAuthContext };
