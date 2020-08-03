import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import apiAxios from "../axios/apiConfig";
import {loadingFinishedAction, loadingStartedAction} from "../actions/actions";
import CardContainer from "../ui/CardContainer/CardContainer";
import Card from "../ui/Card/Card";
import {readObjects} from "../utils";
import Button from "../ui/Button/Button";
import classes from './Wishes.module.scss'
import WishForm from "./WishForm";

const Wishes = (props) => {
    const [wishes, setWishes] = useState([]);

    const loadWishes = useCallback((userId) => {
        if(!userId) {
            return;
        }
        props.onLoadingStarted();
        apiAxios.get(`/wishes.json?orderBy=\"owner\"&equalTo=\"${userId}\"`).then(response => {
            const wishes = readObjects(response.data);
            setWishes(wishes);
            props.onLoadingFinished();
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);


    const addWish = useCallback((userId, wishData) => {
        props.onLoadingStarted();
        apiAxios.post("/wishes.json", {owner: userId, ...wishData}).then(response => {
            props.onLoadingFinished();
            // reload wish list
            loadWishes(userId);
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    const deleteWish = useCallback((userId, wishId) => {
        props.onLoadingStarted();
        apiAxios.delete(`/wishes/${wishId}.json`).then(response => {
            loadWishes(userId);
            props.onLoadingFinished();
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    console.log("LOCATION: " + props.location.params);

    const currentUserId = props.user ? props.user.id : null;
    let friendUserId = null;
    let friendUserName = null;
    if(props.match && props.match.params && props.match.params.friendId) {
        friendUserId = props.match.params.friendId;
        if(props.location.search) {
            const urlParams = new URLSearchParams(props.location.search);
            if(urlParams.get("name")) {
                friendUserName = urlParams.get("name");
            }
        }
    }

    let wishOwnerId = friendUserId ? friendUserId : currentUserId;
    useEffect(() => loadWishes(wishOwnerId), [props.user, props.match]);

    const wishBlocks = wishes.map(wish =>
        <Card key={wish.id}>
            <div className={classes.Wish}>
                <div className={classes.WishImageContainer}>{wish.imageUrl ? <img src={wish.imageUrl} alt="" /> : null}</div>
                <div className={classes.WishInfoContainer}>
                    <span>{wish.title}</span><br/>
                    <span>Price: {wish.price}</span><br/>
                    <span>{wish.description}</span><br/>
                    {wish.owner === props.user.id ? <Button title="Remove" onClick={() => deleteWish(wish.owner, wish.id)}/> : null}
                </div>
            </div>
        </Card>);
    return (
        <Fragment>
            {friendUserId ? null : <WishForm onWish={(wish) => addWish(props.user.id, wish)}/>}
            <div className="header">{friendUserName ? friendUserName + "'s wishes" : "My wishes"}</div>
            <CardContainer>
                {wishBlocks}
            </CardContainer>
        </Fragment>
    );
};


const mapStateToProps = (state) => {
    return {user: state.auth.user};
};

const dispatchActions = dispatch => {
    return {
        onLoadingStarted: () => dispatch(loadingStartedAction()),
        onLoadingFinished: (error) => dispatch(loadingFinishedAction(error))
    }
};

export default connect(mapStateToProps, dispatchActions)(Wishes);