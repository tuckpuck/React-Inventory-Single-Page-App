import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        console.log(JSON.parse(localStorageRef));
        if (localStorage) {
            this.setState({ order: JSON.parse(localStorageRef) });
        } else {
            this.setState({ order: {} });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        // Update order in local storage
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // Make copy of existing state
        const fishes = { ...this.state.fishes };
        // Add our new fish to that fish variable
        fishes[`fish${Date.now()}`] = fish;
        // Set new fishes object to state
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // Take a copy of current state
        const fishes = { ...this.state.fishes };
        // Update that state
        fishes[key] = updatedFish;
        // Set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // Take a copy of current state
        const fishes = { ...this.state.fishes };
        // Remove fish from state
        fishes[key] = null;
        // Update state
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Either add to the order or increment the order
        order[key] = order[key] + 1 || 1;
        // Update object
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => (
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} />
            </div>
        );
    }
}

export default App;
