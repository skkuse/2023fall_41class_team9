import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie'
import axios from 'axios';
import Menubar from '../components/Menubar.js'

function Root(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
    //componentDidMount =>
	useEffect(() => {
        const session_key = cookies.session_key
        const headers = {'session_key':session_key};
        
        if (session_key === undefined){console.log("session key doesn't exist");}
        else{console.log(session_key);}

        axios.post('/', null,{headers:headers})
        .then(res => {
            console.log('#result: ' + JSON.stringify(res.data));
            setCookie('session_key', res.data.session_key);
        }).catch(error => {
            alert('#save error ' + error)
        })

        const some_key = Math.random() * 10000;
        setCookie('session_key', some_key);
		console.log('component mounted!');
	}, [])
	return (
        <div>
            <Menubar/>
        </div>
	)
}

export default Root;
