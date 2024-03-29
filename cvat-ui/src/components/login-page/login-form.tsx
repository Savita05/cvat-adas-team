// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

//

// SPDX-License-Identifier: MIT

// Copyright (C) 2020 Intel Corporation

//

// SPDX-License-Identifier: MIT

import React from 'react';

import Form from 'antd/lib/form';

import Button from 'antd/lib/button';

import Input from 'antd/lib/input';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
// new code added
import { GoogleLogin } from 'react-google-login';
import { googleOAuth2 } from '../../actions/google-actions';
import axios from 'axios';
// new end here

export interface LoginData {
    username: string;

    password: string;
}

interface Props {
    fetching: boolean;
    onSubmit(loginData: LoginData): void;
    successGoogleLogin(response:any):void
}

function LoginFormComponent(props: Props): JSX.Element {

    const { fetching, onSubmit,successGoogleLogin } = props;

    const formItemLayout = {
        labelCol: { span: 6 },

        wrapperCol: { span: 10 },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,

            span: 16,
        },
    };
    // const successGoogleLogin = (response) => {
    //     console.log(response);

    //     const payload = {
    //         access_token: response.accessToken,
    //     };

    //     axios.post('http://localhost:7000/google/', payload).then((response) => {
    //         console.log(response);
    //     });
    // };

    return (
        <>
            <Form onFinish={onSubmit} className='login-form' layout='horizontal'>
                <Form.Item
                    {...formItemLayout}
                    label='Username'
                    hasFeedback
                    name='username'
                    rules={[
                        {
                            required: true,

                            message: 'Please specify a username',
                        },
                    ]}
                >
                    <Input
                        autoComplete='username'
                        prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        placeholder='Username'
                        style={{ borderRadius: '20px' }}
                    />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label='Password'
                    hasFeedback
                    name='password'
                    rules={[
                        {
                            required: true,

                            message: 'Please specify a password',
                        },
                    ]}
                >
                    <Input
                        autoComplete='current-password'
                        prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                        placeholder='Password'
                        type='password'
                        style={{ borderRadius: '20px' }}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button
                        type='primary'
                        loading={fetching}
                        disabled={fetching}
                        htmlType='submit'
                        className='login-form-button'
                    >
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
            <Form className='login-form' layout='horizontal'>
                <Form.Item {...tailLayout}>
                    <GoogleLogin
                        clientId='179747056513-6htt24u0nrclke33f6lifn9bnivmiunp.apps.googleusercontent.com'
                        buttonText='Sign in with Google'
                        cookiePolicy='single_host_origin'
                        onSuccess={successGoogleLogin}
                        onFailure={successGoogleLogin}
                        isSignedIn
                    />
                </Form.Item>
            </Form>
        </>
    );
}

export default React.memo(LoginFormComponent);
