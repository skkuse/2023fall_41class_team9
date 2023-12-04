import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import axios from 'axios';
import Menubar from '../components/Menubar.js'

function Root(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
    const naviagte = useNavigate();
    //componentDidMount =>
    useEffect(() => {
        const fetchData = async () => {
            const session_key = cookies.session_key
            const headers = {'Content-Type': 'application/json'}

            console.log(session_key)
            if (session_key !== undefined) 
                headers['Authorization'] = session_key;

            // if (session_key === undefined) { console.log("session key doesn't exist"); }
            // else { console.log(session_key); }
            // const response = await fetch('http://3.34.50.151:80', {
            //     method: 'POST',
            //     headers: headers
            // });
            // const result = await response.json();
            // console.log(result);

            axios.post('/',null,{headers:headers})
            .then(res => {
                console.log('#result: ' + JSON.stringify(res.data));
                setCookie('session_key', res.data.session_key);
                naviagte('/home')
            }).catch(error => {
                alert('#save error ' + error)
            })
        }
        fetchData();
    }, [])
	return (
        <div>
            <Menubar/>
        </div>
	)
}

export default Root;
