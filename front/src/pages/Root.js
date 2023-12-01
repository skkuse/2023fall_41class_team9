import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie'
import axios from 'axios';
import Menubar from '../components/Menubar.js'

function Root(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
    //componentDidMount =>
    useEffect(() => {
        const fetchData = async () => {
            // const session_key = cookies.session_key
            // const session_key = "12"
            const headers = new Headers();
            // headers.append('Authorization', session_key);
            headers.append('Content-Type', 'application/json');

            // if (session_key === undefined) { console.log("session key doesn't exist"); }
            // else { console.log(session_key); }

            const response = await fetch('http://3.34.50.151:80', {
                method: 'POST',
                headers: headers
            });

            const result = await response.json();
            console.log(result);
            // axios.post('/',null,{})
            // .then(res => {
            //     console.log('#result: ' + JSON.stringify(res.data));
            //     setCookie('session_key', res.data.session_key);
            // }).catch(error => {
            //     alert('#save error ' + error)
            // })
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
