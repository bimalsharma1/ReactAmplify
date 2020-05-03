import React from "react";
import { connect } from "react-redux";

const FileSummaryComponent = ({ lpSummary }) => {
  return (
    <div className="card">
      <h2>File Summary</h2>
      <br />
      <div>
        <div>
          <div class="table-responsive-sm">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">File Name</th>
                  <th scope="col">Min</th>
                  <th scope="col">Max</th>
                  <th scope="col">Median</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lpSummary?.fileName}</td>
                  <td>{lpSummary?.min}</td>
                  <td>{lpSummary?.max}</td>
                  <td>{lpSummary?.median}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    lpSummary: state.lpSummary
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export const FileSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSummaryComponent);