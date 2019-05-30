import React from 'react';
import PropTypes from 'prop-types';

const Login = () => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onclick={()=>this.props.authenticate('Github')}>Log in with Github</button>
        <button className="twitter" onclick={()=>this.props.authenticate('Twitter')}>Log in with Twitter</button>
        <button className="facebook" onclick={()=>this.props.authenticate('Facebook')}>Log in with Facebook</button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;