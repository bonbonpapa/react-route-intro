import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {data, sellers} from "./data"
let renderRoot = () => {
  return (
    <div>
      Welcome to this page. Click here to view all the items:
      <Link to="/allItems">All items</Link>
    </div>
  );
};



class SellerItem extends Component {
    render = () => {
        let sellerId = this.props.sellerId;
        let toDisplay = sellers.find(elem => {
            return elem.sellerId === sellerId
        })
        return (
            <div>
                <div>{"Seller ID: " + toDisplay.sellerId}</div>
                <div>{"Seller Name: " + toDisplay.name}</div>
                <div>{"Seller Description: " + toDisplay.seller_desc}</div>
            </div>
        )
    }
}

class ShoppingItem extends Component {
    render = () => {
    
        let toDisplay = data.find(elem => {
            return elem.identifier === this.props.targetId
          })
        let sellerpath = "/seller/" + toDisplay.sellerId;
        return (
            <div>
                <h3>Details</h3>
                <div>{"Description: " + toDisplay.Description}</div>
                <div>{"Remaining: " + toDisplay.remaining}</div>
                <div>{"Seller information: "}<Link to={sellerpath}>{toDisplay.sellerId}</Link></div>
                <div>
                    <img src={"/"+ toDisplay.pic} />
                </div>
                
            </div>
        )
    }
} 

let renderAllItems = () => {
  return (
    <div>
        {            
            data.map(e => {
            let path = "/item/" + e.identifier
            return (
              <div>
                {/* <Link to={path}>{e.Description}</Link> */}
                <Link to = {`/item/${e.identifier}`}>{e.Description}</Link>
                <img src={"/" + e.pic} width = "100px" height = "100px" hspace= "20px"/>
                </div>
            );
        })
    }
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderRoot} />
          <Route exact={true} path="/allItems" render={renderAllItems} />
          <Route exact={true} path="/seller/:sellerId" render={ rd => <SellerItem sellerId = {rd.match.params.sellerId}/> } />
          <Route exact={true} path="/item/:itemId" render={
          renderItem => <ShoppingItem targetId={renderItem.match.params.itemId } /> 
        } />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
