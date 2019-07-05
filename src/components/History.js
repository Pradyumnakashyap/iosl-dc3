import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authLib from '../config/authlib'

class History extends Component {
  /*
    Extract after user login the user ID in the database and 
    present all the specific user packages hostry in a table,
    present only main pakcages properties.
  */
  constructor(){
    super()
    this.state = {
      package: {},
      items : [],
      isLoading: false,
      error:null,
    }
  }

  componentDidMount() {
    /**
     fetch user data from database
     */
    const options = authLib.getUserObj() ;
    console.log(options)
    const userID = options.ID

    const fetchOption = authLib.getFetchOptions();
    

    this.setState({ isLoading: true });   
    fetch("http://localhost:8000/packages/user/" + userID, fetchOption)
      .then(function(response){
        if (response.ok) {
            return response.json();
          } 
          else {
            throw new Error('Something went wrong ...');
          }
      })
      .then((data) => {
          console.log(data)
            data.forEach(elemnt => {
                this.state.items.push(elemnt)
            })
            this.setState({isLoading: false })
            console.log(this.state.items);
            console.log(this.state.items.length);

      })
      .catch(function(error){
          console.log(error)
      })
  }


 
  render() {
 
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">User Packages</h4>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Street Adress</th>
                <th>Post Code</th>
                <th>City</th>
                <th>Country</th>
                <th >Status</th>
                <th className="text-center">Pick Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.OrderID} >
                  <td><Link to={`/package/${item.OrderID}`} style={{color: 'blue'}}>
                      {item.OrderID}
                      </Link>
                  </td>
                  <td>{item.dropstreetaddress}</td>
                  <td>{item.droppostcode}</td>
                  <td>{item.dropcity}</td>
                  <td>{item.dropcountry}</td>
                  <td>{item.Status}</td>
                  
                  <td className="text-right"> {new Date(item.PickDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

export default History;