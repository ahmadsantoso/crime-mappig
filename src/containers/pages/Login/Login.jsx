import React, { Component } from 'react';
import './Login.css';
import Button from '../../../component/atoms/Button';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
//import { actionUsername } from '../../../config/redux/action';

class Login extends Component {
    //changeUser = () => {
    //    this.props.changeUserName()
    //}

    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        const { history } = this.props;
        const res = await this.props.loginAPI({ email, password }).catch(err => err);
        if (res) {
            console.log('LOGIN SUCCESS', res)
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            history.push('/Dashboard')
        } else {
            alert('LOGIN FAILED')
        }
    }

    render() {
        return (
            <div className="auth-container" >
                <div className="auth-card">
                    <p className="auth-title">Welcome</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                </div>
            </div>
        )
    }
}

//const reduxState = (state) => ({
//    popupProps: state.popup,
//    userName: state.user
//})

//const reduxDispatch = (dispatch) => ({
//    changeUserName: () => dispatch(actionUsername())
//})

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(Login);