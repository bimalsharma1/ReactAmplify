import React from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const DownloadComponent = ({ filter, setFilterDate, setFilterMeter, setFilterDataType, setFilterData, loadData, lpSummary }) => {
  return (
    <div>
      <div className="card p-3 col-12">
        <div>
          <div>
            <CSVLink
              data={lpSummary}
              filename={lpSummary[0]?.FileName}
              className="btn btn-primary"
              target="_blank"
            >
              Download
                        </CSVLink>
            <span class="p-3"></span>
            <a href="/" target="_top">Back</a>
          </div>
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
                {lpSummary.map((val, index) => (
                  <tr key={index}>
                    <td>{val?.FileName}</td>
                    <td>{val?.Min}</td>
                    <td>{val?.Max}</td>
                    <td>{val?.Median}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filter: { date: '', meter: '', dataType: '' },
    lpSummary: state.lpSummary
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData() {
      dispatch(mutations.requestLPSummary());
    }
  }
};

export const ConnectedDownload = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadComponent);
