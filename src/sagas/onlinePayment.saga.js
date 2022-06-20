import { call, put, takeEvery } from '@redux-saga/core/effects';
import { reset } from 'redux-form';
import { displayPaymentStatusMessage, hideSpinner } from '../actions';
import { API_SERVER, REGISTER_PAYMENT, PROCESS_ONLINE_PAYMENT } from '../constants';
import store from '../store';
import { apiManualPost } from '../utils/request';

function* registerPaymentSaga({ jobpostOrderDetails }) {
  try {
    const lang = store.getState().language.lang;
    const customerDetails = {
      firstname: jobpostOrderDetails.firstname,
      lastname: jobpostOrderDetails.lastname,
      email: jobpostOrderDetails.email,
      address: jobpostOrderDetails.address,
      city: jobpostOrderDetails.city,
      zip_code: jobpostOrderDetails.zip_code,
    };
    // Add VAT in amount before sending for payment
    const totalAmountWithVat = jobpostOrderDetails.totalSum;

    const url = `${API_SERVER}/RegisterOnlinePayment?lang=${lang}`;
    const body = {
      ...customerDetails,
      jobPost: [
        {
          company_id: jobpostOrderDetails.company_id,
          post_id: jobpostOrderDetails.post_id,
          jobPost_order: [
            {
              order_id: jobpostOrderDetails.order_id,
              amount: totalAmountWithVat,
              redirect_url: `${window.location.origin}/payment`,
            },
          ],
        },
      ],
    };
    const result = yield call(apiManualPost, url, JSON.stringify(body));
    const parsedResult = JSON.parse(result.data);

    if (parsedResult.successful) {
      window.open(parsedResult.paymentApi, '_self');

      yield put(hideSpinner()); // In case users don't proceed with payment, turn off spinner in advertform.
    } else {
      console.log('error in getting payment api');
    }
  } catch (e) {
    console.log(e);
  }
}

function* processOnlinePaymentSaga() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const transaction_id = urlParams.get('transactionId');
    const company_id = parseInt(urlParams.get('paymentId').split('xx')[0]);
    const post_id = parseInt(urlParams.get('paymentId').split('xx')[1]);
    const order_id = parseInt(urlParams.get('paymentId').split('xx')[2]);
    const url = `${API_SERVER}/ProcessOnlinePayment`;

    const details = {
      company_id,
      post_id,

      jobPost_order: [
        {
          order_id,
          payment_reference: transaction_id,
        },
      ],
    };

    const result = yield call(
      apiManualPost,
      url,
      JSON.stringify({
        ...details,
      }),
    );
    const parsedResult = JSON.parse(result.data);
    if (parsedResult) {
      yield put(displayPaymentStatusMessage(parsedResult.responseText));
      yield put(hideSpinner());
      yield put(reset('vacancy'));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRegisterPaymentSaga() {
  yield takeEvery(REGISTER_PAYMENT, registerPaymentSaga);
}

export function* watchProcessOnlinePaymentSaga() {
  yield takeEvery(PROCESS_ONLINE_PAYMENT, processOnlinePaymentSaga);
}
