import React from "react";
import { connect } from "react-redux";

const HomeComponent = ({ lp, handleFileData }) => {
  return (
    <div className="card p-3 col-12">
      <h3>Please select an option</h3>
      <a href="/upload" target="_top">Upload file</a>
      <a href="/download" target="_top">Download distributd data</a>
    </div>
  );
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    lp:state.lp
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export const ConnectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
