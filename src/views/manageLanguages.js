import React, { Component } from "react";
import '../views/modal.css';
import '../scss/_custom.scss';
import { withTranslation } from "react-i18next";
import PropTypes, { element } from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from 'reactstrap';

class ManageLanguages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languagesDetails: [],
      languageImageUrl: '',
      isSearching:false
    };
    this.onLanguageSelect = this.onLanguageSelect.bind(this);
  }


  componentDidMount() {
    this.getLanguagesData();
  }

  getLanguagesData() {
    fetch('https://www.mist-one.com/pub/languages').
      then(response => response.json())
      .then(data => this.setState({
        languagesDetails: data
      }, () => {
        console.log("Data" + JSON.stringify(this.state.languagesDetails.data.rows))
      }));
  }

  onLanguageSelect(imageUrl) {
    this.setState({
      languageImageUrl: imageUrl
    })
  }

  filterLanguageList(){
   this.setState({
     isSearching:true,
     languageImageUrl:''
   })

  }

  render() {
    let listOfLanguages = [];
    {
      this.state.languagesDetails.data &&
      this.state.languagesDetails.data.rows.length > 0 ?
      this.state.languagesDetails.data.rows.map(element =>
        this.state.isSearching && document.getElementById("search").value.length>0 ?
        listOfLanguages.push(
        element.languageNameEnglish.toLowerCase().includes(document.getElementById("search").value.toLowerCase())?
          <div className="col-4 selectionPointer" onClick={() => this.onLanguageSelect(element.image)}>{element.languageNameEnglish}</div>
          :""
        ):
        listOfLanguages.push(
       
          <div className="col-4 selectionPointer" onClick={() => this.onLanguageSelect(element.image)}>{element.languageNameEnglish}</div>
          
        )

      )
      : listOfLanguages.push("No Data Found")
    }
    return (
      <div className="mt-4">
        <ToastContainer />
        <div className="my-0 position-relative row form-group mb-4">
          <Input type="text" name="search" 
          className="search-bar  custom-search-box languageSearch" 
          onChange={()=>this.filterLanguageList()}
          id="search" placeholder="Search" />
        </div>
        <div className="col-sm-12 col-12">
          <div className="card">
            <div className="card-header font-weight-bold">
              Languages
            </div>

            <div className="card-body">
              <div className="row mb-4">
                {listOfLanguages}
              </div>

            </div>
          </div>

          <div className="card">
            <div className="card-header font-weight-bold">
              Language Images
                    </div>
            <div className="card-body">
              {this.state.languageImageUrl != null && this.state.languageImageUrl.length > 0 ?
                <img src={this.state.languageImageUrl} className="languageImagePosition " />
                : "No Images Found"}
            </div>
          </div>

        </div>
        <div>


        </div>

      </div>


    );
  }
};


export default (withTranslation("translations")(ManageLanguages));