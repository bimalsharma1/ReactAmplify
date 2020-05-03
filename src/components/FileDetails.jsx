import React from "react";
import { connect } from "react-redux";

const FileDetailsComponent = ({ lp }) => {
  return (
    <div className="card">
      <h2>File Details</h2>
      <div>
        <br />
        <div class="table-responsive-sm">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Meter</th>
                <th scope="col">Date Time</th>
                <th scope="col">Value</th>
                <th scope="col">Data Type</th>
              </tr>
            </thead>
            <tbody>
              {lp.map((val, index) => (
                <tr key={index}>
                  <td>{val.meterPointCode}</td>
                  <td>{val.dateTime}</td>
                  <td>{val.dataValue}</td>
                  <td>{val.dataType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    lp: state.lp
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export const FileDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDetailsComponent);
