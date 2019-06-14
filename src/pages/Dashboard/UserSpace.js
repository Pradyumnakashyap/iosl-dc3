import React from 'react';

import TableWithLinks from '../Tables/ExtendedTables/TableWithLinks';
import Register from '../Forms/RegularForms/Register';



  class UserSpace extends React.Component{
    constructor(){
      super()
      this.state = {
        api : 'http://localhost:8000/address',
        addressID : 0,
        recieverID: 0
      }
      // this.reciverValidation = this.reciverValidation.bind(this);
      this.submit = this.submit.bind(this);
      this.addPackage =  this.addPackage.bind(this)
    }
    

    submit(values){
      console.log("sumbit start")
      console.log(values)
      fetch("http://localhost:8000/address", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "street":values.street,
	        "city":values.city,
	        "country": values.country,
	        "postcode": Number(values.zip)
        })
        })
          .then(res => res.json())
          .then(data => this.setState({
            addressID : data.AddressID
          }))
          .catch(err => console.log(err))
      
      console.log("finish pick up, start destenation " + this.state.addressID)

      fetch("http://localhost:8000/address", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "street":values.dstreet,
          "city":values.dcity,
          "country": values.dcountry,
          "postcode": Number(values.dzip)
        })
        })
          .then(res => res.json())
          .then(data => this.setState({
            recieverID : data.AddressID
          }))
          .then(data => console.log(data))
          .catch(err => console.log(err))

        console.log("finish destenation " + this.state.recieverID)
        
      }

    addPackage(){
      console.log("starting to add package")
      console.log(this.state.recieverID)
      console.log(this.state.addressID)
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = mm + '-' + dd + '-' + yyyy;
      
      fetch("http://localhost:8000/packages", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "pickaddressid":this.state.addressID,
          "dropaddressid":this.state.recieverID,
          "pickdate": today,
          "arrivaldate": null,
          "personid":33,
          "receieverid":34,
          "status": "Registered"   
        })
        })
      return "The package have been registered, thank"
    }

    
      

  render(){
    // if (this.state.addressID){
    //   this.addPackage() this.state.addressID > 0 && 
    // }
  return(
          <div className="content">
            <div className="container-fluid">
            {this.state.recieverID === 0 ? 
              <div className="row">
                <div className="col-md-6">
                  <TableWithLinks />
                </div>
                <div className="col-md-6">
                  <Register onSubmit={this.submit} />
                </div>
              </div> : <h2>{this.addPackage()}</h2>}
            </div>
          </div>
    );
  }
}

export default UserSpace;