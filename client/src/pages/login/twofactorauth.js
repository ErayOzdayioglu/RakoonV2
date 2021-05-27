import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';
import Axios from "axios";
import { Form } from 'react-bootstrap';
const jwt = require("jsonwebtoken");

const TwoFactorAuth = () => {
    const { token } = useParams();
    const history = useHistory();
    const [registerCode, setRegisterCode] = useState("");
    const PORT = process.env.PORT || 4000;
    var URL = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    var url = `${URL}/2fa/verifySecret/${token}`;
    const submit = async (e) => {
        e.preventDefault();
        const input = registerCode;
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
            method: "POST",
            data: {
                input: input,
                id: token,
            },
            credentials: 'include',
            withCredentials: true,
            url: url
        });
        console.log(res.data);
        console.log(typeof res.data);
        if (typeof res.data == typeof {}) {
            const token = jwt.sign(res.data, 'shhhhh');
            sessionStorage.setItem('sessionID', token);
            history.push('/');
        }
        else {
            // zeliha error invalid code
            document.querySelector('.InvalidCode').style.display = 'block';
        }

    };


    return (
        <Form style={{ margin: "3em auto", position: "relative" }}>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control type="number" onChange={e => setRegisterCode(e.target.value)} />
            </Form.Group>
            <span style={{ fontSize: '16px', position: 'absolute', right: '0', color: 'red', display: 'none' }} className='InvalidCode'>Code is invalid</span>

            <div style={{ display: "flex" }}>
                <Button variant="primary" style={{ margin: "3em auto" }} type="submit" onClick={(e) => submit(e)}>
                    Send
            </Button>
            </div>

        </Form>
    )
}

export default TwoFactorAuth
