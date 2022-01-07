import React, { createContext } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import Swal from 'sweetalert2';


const createAuthContext = createContext();

var userPool = new CognitoUserPool({
    UserPoolId: "ap-south-1_qLkXcua4B",
    ClientId: "2pq4j37blp4ki285mr7acfb1nr",
});


const AuthContext = ({ children }) => {

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

    // ************************** SignIn *******************************************
    const sign_in = async (email, password) => {
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
                onSuccess: (res) => {
                    resolve(res);
                },
                onFailure: (err) => {
                    console.log(err);
                    reject(err);
                },
            });
        });
    };

    // ************************** Registartion ***************************************
    const sign_up = async ({ username, password, phone, firstname, lastname, dob }) => {
        return new Promise((res, rej) => {
            let attributeList = [];
            var dataPhoneNumber = {
                Name: 'phone_number',
                Value: phone,
            };
            var dataFullName = {
                Name: 'name',
                Value: firstname + lastname,
            };
            var dataBirthDate = {
                Name: 'birthdate',
                Value: dob
            }
            var role = {
                Name: 'custom:role',
                Value: 'Patient'
            };
            var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
            var attributeFullName = new CognitoUserAttribute(dataFullName);
            var attributeBirthDate = new CognitoUserAttribute(dataBirthDate);
            var attributeRole = new CognitoUserAttribute(role);
            attributeList.push(attributePhoneNumber);
            attributeList.push(attributeFullName);
            attributeList.push(attributeBirthDate);
            attributeList.push(attributeRole);
            userPool.signUp(username, password, attributeList, null, (err, data) => {
                if (err) {
                    rej(err);
                }
                else {
                    verify_modal(username).then(() => res()).catch(err => rej(err));
                }
            });
        })
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

    return <createAuthContext.Provider value={{
        sign_in,
        sign_up,
        forgot_password,
        reset_code_operation
    }}>
        {children}
    </createAuthContext.Provider>
}

export { AuthContext, createAuthContext };
