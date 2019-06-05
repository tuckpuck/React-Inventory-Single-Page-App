import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {
      static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    addFish: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  }

  authHandler = async(authData) => {
    // Look up the current store in the Firebase database
    const store = await base.fetch(this.props.storeId, {context: this});
    console.log(store);
    // Claim it if there is no owner
    if (!store.owner) {
        // save it as our own
        await base.post(`${this.props.storeId}/owner`, {
          data: authData.user.uid
        })
    }
    // Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({uid:null});
  }
  
    render() {
      const logout = <button onClick={this.logout}>Log Out!</button>

      // Check if they are logged in
      if (!this.state.uid) {
          return <Login authenticate={this.authenticate} />;
      }

      // Check if they are not the owner of store
      if(this.state.uid !== this.state.owner){
        return <div>
          <p>Sorry, you are not the owner</p>
          {logout}
        </div>
      }

      // They must be owner, render the inventory"
        return (
            <div className="Inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map((key) => (
                    <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;
