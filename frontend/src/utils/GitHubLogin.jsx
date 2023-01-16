import { useAuthorizer } from '@authorizerdev/authorizer-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const GitHubLogin = () => {
    const navigate = useNavigate();

    const { user, loading } = useAuthorizer();

    const { accesstoken } = useParams();
    if (!accesstoken) {
        navigate('/login');
    }


    const loginOrSignup = async () => {
        const response = await fetch('http://localhost:8181/api/auth/github', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const json = await response.json();
        if (response.status === 200) {
            if (!json.new) {
                // The user is not new (login)
                navigate('/projects');
                localStorage.setItem('auth-token', json.authtoken);
            }
            else {
                // The user is new (signup)
                navigate('/user/new');
                localStorage.setItem('auth-token', json.authtoken);
            }
        }
        else {
            window.alert('Internal Server Error');
            navigate('/login');
        }
    }


    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login');
            }
            else {
                loginOrSignup();
            }
        }
    }, [loading]);




  return (
    <div>GitHubLogin</div>
  )
}

export default GitHubLogin