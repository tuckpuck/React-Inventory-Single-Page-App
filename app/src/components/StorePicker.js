import React from 'react';
import { getFunName } from "../helpers";



class StorePicker extends React.Component {
    myInput = React.createRef();
    goToStore = event => {
        // Prevent page reload
        event.preventDefault();
        // Get text from an input field
        console.log(this); 
        // Change page based on form input
        
    }

    render() {
        return (
        <form action="" className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter a Store</h2>
            <input 
                type="text" 
                ref={this.myInput}
                required
                placeholder="Store Name" 
                defaultValue={getFunName()} />  
            <button type="submit">Visit Store →</button> 
        </form>
        )
    }
}

export default StorePicker;