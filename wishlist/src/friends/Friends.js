import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import apiAxios from "../axios/apiConfig";
import {loadingFinishedAction, loadingStartedAction} from "../actions/actions";
import CardContainer from "../ui/CardContainer/CardContainer";
import Card from "../ui/Card/Card";
import {readObjects} from "../utils";
import Button from "../ui/Button/Button";
import SearchForm from "./SearchForm";
import classes from './Friends.module.scss'

const Friends = (props) => {
    const [friends, setFriends] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [users, setUsers] = useState([]);

    const loadFriends = useCallback((userId) => {
        if(!userId) {
            return;
        }
        props.onLoadingStarted();
        apiAxios.get(`/friends.json?orderBy=\"owner\"&equalTo=\"${userId}\"`).then(response => {
            const friendRelations = readObjects(response.data);
            const loadFriendsPromises = friendRelations.map(relation => new Promise(((resolve, reject) =>
                {
                    apiAxios.get(`/users/${relation.friend}.json`).then(response => {
                        let friend = response.data;
                        friend.id = relation.friend;
                        friend.relId = relation.id;
                        resolve(friend);
                    }).catch(error => reject(error));
                })));
            Promise.all(loadFriendsPromises).then(friendsFromPromises => {
                setFriends(friendsFromPromises);
                props.onLoadingFinished();
            }).catch(error => props.onLoadingFinished(error));
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    const searchUsers = useCallback((value) => {
        if(!value) {
            setUsers([]);
            return;
        }
        props.onLoadingStarted();
        apiAxios.get(`/users.json?orderBy=\"name\"&equalTo=\"${value}\"`).then(response => {
            const users = readObjects(response.data);
            setUsers(users);
            props.onLoadingFinished();
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    const addFriend = useCallback((ownerId, friendId) => {
        props.onLoadingStarted();
        apiAxios.post("/friends.json", {owner: ownerId, friend: friendId}).then(response => {
            props.onLoadingFinished();
            // reload friend list
            loadFriends(ownerId);
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    const deleteFriend = useCallback((ownerId, relId) => {
        props.onLoadingStarted();
        apiAxios.delete(`/friends/${relId}.json`).then(response => {
            loadFriends(ownerId);
            props.onLoadingFinished();
        }).catch(error => props.onLoadingFinished(error));
    }, [props.onLoadingStarted, props.onLoadingFinished]);

    useEffect(() => loadFriends(props.user ? props.user.id : null), [props.user]);

    const friendsBlocks = friends.map(friend =>
        <Card key={friend.relId}>
            <span>{friend.name}</span>, <span>birthday at: {new Date(friend.birthdate).toLocaleDateString()}</span>
            <Button title="See wishes" onClick={() => props.history.push({pathname: "/wishes/" + friend.id, search: "?name=" + friend.name})}/>
            <Button title="Remove" onClick={() => deleteFriend(props.user.id, friend.relId)}/>
        </Card>);

    const usersBlocks = users.map(user =>
        <Card key={user.id}>
            <span>{user.name}</span>
            <Button title="Add as friend" onClick={() => addFriend(props.user.id, user.id)} disabled={friends.some(f => f.id === user.id) || user.id === props.user.id}/>
        </Card>);

    return (
        <CardContainer layout="column">
            <SearchForm label="Find new friends (Alisa, Alex, etc):" value={searchUser} setValue={setSearchUser} onChange={searchUsers}/>
            {usersBlocks.length > 0 ? <h3 className={classes.FriendsTitle}>Found: </h3> : null}
            {usersBlocks}
            {friendsBlocks.length > 0 ? <h3 className={classes.FriendsTitle}>My Friends: </h3> : null}
            {friendsBlocks}
        </CardContainer>
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

export default connect(mapStateToProps, dispatchActions)(Friends);