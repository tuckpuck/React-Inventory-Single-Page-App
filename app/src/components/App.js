import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        // Make copy of existing state
        const fishes = { ...this.state.fishes};
        // Add our new fish to that fish variable
        fishes[`fish${Date.now()}`] = fish;
        // Set new fishes object to state
        this.setState({
            fishes: fishes
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    render() {
        return ( 
        <div className = "catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market"/>
                <ul className="fishes">
                    {Object.keys(this.state.fishes).map(key => <p>{key}</p>)}
                </ul>
            </div>
                <Order/>
                <Inventory 
                addFish={this.addFish}
                loadSampleFishes={this.loadSampleFishes} />
        </div>
        )
    }
}

export default App;