import { takeEvery, put, call } from 'redux-saga/effects';
import {
  hideSpinner,
  openAdToSeeAdInfo,
  saveAndPublishAdvertisementFailed,
  saveAndPublishAdvertisementSuccess,
  saveNewCampaignSuccess,
  showFailedSnackbar,
  showSuccessSnackbar,
} from '../actions';
import { API_SERVER, SEND_INVOICE_TO_TALOUS } from '../constants';
import store from '../store';
import { apiManualPost } from '../utils/request';

function* sendInvoiceToTalousSaga({ detail }) {
  const url = `${API_SERVER}/SendJobPostInvoice`;
  const isToChangeCampaign = store.getState().advertisement.isToChangeCampaign;

  const {
    company_id,
    company_name,
    business_id,
    firstname,
    lastname,
    email,
    address,
    zip_code,
    city,
    description,
    totalSum,
    amount,
    post_id,
    order_id,
    marketing_budget,
    mkt_description,
    isSameCampaign,
    selectedCampaign,
    postIdToFetch,
  } = detail;

  try {
    const invoiceBody = {
      user_type: 'Yritys',
      contact_person_name: 'Jobportal',
      company_name: 'Jobportal Oy',
      business_id: '3213073-1',
      phone: '020 734 6902',
      email: 'asiakaspalvelu@jobportal.fi',
      bank_name: 'Nordea Pankki',
      account_number: 'FI19 1745 3000 2744 17',
      address: 'Salomonkatu 17B',
      zip_code: '00100',
      city: 'Helsinki',
      customer: [
        {
          company_id, //Needed for Jobportal Backend
          post_id, //Needed for Jobportal Backend
          company_name,
          business_id,
          person_to_contact: `${firstname} ${lastname}`,
          person_to_contact_email: email,
          customer_type: 'Yritys',
          delivery_method: 'Sähköposti',
          country: 'Suomi',
          delivery_address: address,
          zip_code,
          city,
          payment_control: 'Maksuvalvonta',
          Invoice: [
            {
              description: 'Työpaikkailmoitus',
              order_id,
              //invoice_reference: order_id?.toString(),
              billing_date: new Date(),
              overdue: selectedCampaign.includes_mktbudget ? 7 : 14,
              invoice_price_selection: 0,
              total_sum: totalSum,
              status: 1,
              post_id,
              rows: [],
            },
          ],
        },
      ],
    };

    if (isSameCampaign) {
      invoiceBody.customer[0].Invoice[0].rows[0] = {
        description: mkt_description,
        quantity: '1',
        unit: 'kpl',
        quantity_price: marketing_budget,
        vat_percent: 24,
        sum_tax_free: marketing_budget,
        vat: marketing_budget * 0.24,
      };
    } else {
      invoiceBody.customer[0].Invoice[0].rows[0] = {
        description,
        quantity: '1',
        unit: 'kpl',
        quantity_price: amount,
        vat_percent: 24,
        sum_tax_free: amount,
        vat: amount * 0.24,
      };
      if (!!marketing_budget) {
        invoiceBody.customer[0].Invoice[0].rows.push({
          description: mkt_description,
          quantity: '1',
          unit: 'kpl',
          quantity_price: marketing_budget,
          vat_percent: 24,
          sum_tax_free: marketing_budget,
          vat: marketing_budget * 0.24,
        });
      }
    }

    if (!!amount || !!marketing_budget) {
      const response = yield call(apiManualPost, url, JSON.stringify({ ...invoiceBody }));
      const campaign_id = selectedCampaign.id;
      if (response.data === 'Invoice added and sent to the customer') {
        if (isToChangeCampaign) {
          yield put(showSuccessSnackbar());
          yield put(openAdToSeeAdInfo(postIdToFetch));
          yield put(saveNewCampaignSuccess());
        } else {
          yield put(saveAndPublishAdvertisementSuccess());
        }
        if (selectedCampaign.includes_mktbudget) {
          sendInvoicePaymentReminderEmail({ company_name, campaign_id, email });
        }
      } else {
        if (isToChangeCampaign) {
          yield put(showFailedSnackbar());
          yield put(hideSpinner());
        } else {
          yield put(saveAndPublishAdvertisementFailed());
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export const sendInvoicePaymentReminderEmail = async function(detail) {
  const url = `${API_SERVER}/SendInvoicePaymentReminderEmail`;

  try {
    await fetch(url, { method: 'POST', body: JSON.stringify(detail) });
  } catch (e) {
    console.log(e);
  }
};

export function* watchSendInvoiceToTalousSaga() {
  yield takeEvery(SEND_INVOICE_TO_TALOUS, sendInvoiceToTalousSaga);
}
