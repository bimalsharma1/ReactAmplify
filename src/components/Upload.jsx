import React from "react";
import CSVReader from 'react-csv-reader'
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { FileSummary } from "./FileSummary";
import { FileDetails } from "./FileDetails";
import { v4 as uuidv4 } from 'uuid';

const parseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header =>
    header
      .toLowerCase()
      .replace(/\W/g, '_')
}

const UploadComponent = ({ lp, lpSummary, handleFileData, onSelectChange }) => {
  return (
    <div className="card p-3 col-12">
      <div>
        <div>File type:</div>
        <div>
          <select class="form-control" onChange={onSelectChange} >
            <option value="lp">LP</option>
            <option value="tou">TOU</option>
          </select>
        </div>
      </div>
      <h2>Upload file1</h2>

      <CSVReader
        cssClass=""
        cssInpuClass="form-control form-control-lg"
        label="Select CSV file with LP or TOU"
        onFileLoaded={handleFileData}
        // onError={this.handleDarkSideForce}
        parserOptions={parseOptions}
        inputId="ObiWan"
        inputStyle={{ color: 'red' }}
      />
      <br />
      <a href="/" target="_top">Back</a>
      <br />
      <div>
        <FileSummary lpSummary = {lpSummary}></FileSummary>
        <br />
        <FileDetails lp = {lp}></FileDetails>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    lp: state.lp,
    lpSummary: state.lpSummary
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFileData(data, fileDetails) {
      var dataValues = [];
      const cleanData = data.map((val, index) => {
        dataValues.push(val.data_value ? val.data_value : 0);
        return {
          id: uuidv4(),
          meterPointCode: val.meterpoint_code,
          serialNumber: val.serial_number,
          plantCode: val.plant_code,
          dateTime: val.date_time,
          dataType: val.data_type,
          dataValue: val.data_value,
          units: val.units,
          status: val.status
        };
      })

      const median = (arr) => {
        const mid = Math.floor(arr.length / 2),
          nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      };

      const summaryData = {
        fileName: fileDetails.name,
        date: fileDetails.name.split('_')[1],
        meter: fileDetails.name.split('_')[2],
        dataType: fileDetails.name.split('_')[0],
        min: Math.min(...dataValues),
        max: Math.max(...dataValues),
        median: median(dataValues)
      }

      dispatch(mutations.requestLPCreation(cleanData));
      dispatch(mutations.requestLPSummaryCreation(summaryData));
    },
    onSelectChange(event) {
      console.log(event.target.value);
    }
  }
};

export const ConnectedUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadComponent);
