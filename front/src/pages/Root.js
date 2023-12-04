import React, {useEffect} from 'react';
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

            axios.post('/',null,{headers:headers})
            .then(res => {
                console.log('#result: ' + JSON.stringify(res.data));
                setCookie('session_key', res.data.session_key);
                naviagte('/home')
            }).catch(error => {
                alert(error)
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
