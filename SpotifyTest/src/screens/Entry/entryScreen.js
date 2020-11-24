/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text } from 'react-native';

//Authentication handler
import authHandler from '../../utils/authHandler';

//Redux imports
import { connect } from 'react-redux';
import {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
} from '../../redux/features/authentication/authenticationSlice';

//Navigations
import LoggedIn from '../LoggedIn/loggedIn';
import Guest from '../Guest/guest';

class EntryScreen extends Component {

    componentDidUpdate(prevProps) {
        if (
            this.props.refreshToken !== prevProps.refreshToken &&
            !this.props.accessToken
        ) {
            this.tryAutoLogin();
        }
        if (this.props.accessToken !== prevProps.accessToken) {
            this.props.setLoadingFalse();
        }
    }

    tryAutoLogin = async () => {
        this.props.setLoadingTrue();
        try {
            const authenticationObject = await authHandler.refreshLogin(
                this.props.refreshToken
            );
            this.props.setAccessToken({
                accessToken: authenticationObject.accessToken,
            });
            this.props.setRefreshToken({
                refreshToken: authenticationObject.refreshToken,
            });

            this.props.setLoadingFalse();
        } catch (e) {
            console.log("Hello: ", e);
            this.props.setLoadingFalse();
        }
    };

    render() {
        const { accessToken, loading } = this.props.authentication;

        if (loading) {
            return <Text>Loading</Text>;
        }

        if (accessToken) {
            return <LoggedIn accessToken={accessToken} />;
        }

        return <Guest />;
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        accessToken: state.authentication.accessToken,
        refreshToken: state.authentication.refreshToken,
    };
};

const mapDispatchToProps = {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryScreen);
