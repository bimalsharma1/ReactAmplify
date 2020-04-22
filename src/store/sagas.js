import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from '../store/mutations';
import { history } from './history';

const url = "https://ggn8xgwund.execute-api.ap-southeast-2.amazonaws.com/Prod"; // THIS SHOULD BE AN ENV VARRIABLE
const options = {
  headers: { 'Access-Control-Allow-Origin': '*' }
};

export function* saveLPSaga() {
  while (true) {
    const lp = yield take([
      mutations.REQUEST_LP_CREATION]);

    axios.post(url, {
      lp: lp.lp
    }, options);
  }
}

export function* saveLPSummarySaga() {
  while (true) {
    const lpSummary = yield take([
      mutations.REQUEST_LPSUMMARY_CREATION]);

    axios.post(url + '/summary', {
      lpSummary: lpSummary.lps
    }, options);
  }
}
export function* getLPSummarySaga() {
    const { data } = yield axios.get(url + '/summary', options);
    yield put(mutations.setLPSUMMARY(data));
}

export function* saveTOUSaga() {
  console.info("start save TOU ");
  while (true) {
    const lp = yield take([
      mutations.REQUEST_TOU_CREATION]);

    axios.post(url, {
      tou: {
        id: task.taskID,
        group: task.groupID,
        isComplete: task.isComplete,
        name: task.name
      }
    }, options);
  }
}

export function* taskCreationSaga() {
  console.info("Gstart task creation, ");
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = `U1`;
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID))
    const { res } = yield axios.post(url, {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New Task"
      }
    });
    console.info("Got reponse, ", res);
  }
}

export function* taskModificationSaga() {
  console.info("start task modification, ");
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE]);

    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        isComplete: task.isComplete,
        name: task.name
      }
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(`${url}/authenticate`, {
        username,
        password
      });
      console.log("authenticated", data);
      if (!data) throw new Error("Incorrect credentials");

      console.log("authenticated", data.state);
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/dashboard");
    } catch (e) {
      console.log(e);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}