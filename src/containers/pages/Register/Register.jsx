import React, { Component } from 'react';
import './Register.css';
import Button from '../../../component/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleRegisterSubmit = async () => {
        const { email, password } = this.state;
        const { history } = this.props;
        console.log('data before send: ', email, password)
        const res = await this.props.registerAPI({ email, password }).catch(err => err);
        if (res) {
            alert('REGIST SUCCESS')
            this.setState({
                email: '',
                password: ''
            })
            history.push('/Login')
        }
    }

    render() {
        return (
            <div className="auth-container" >
                <div className="auth-card">
                    <p className="auth-title">Register</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleRegisterSubmit} title="Create" loading={this.props.isLoading} />
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);