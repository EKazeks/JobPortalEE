import React from 'react';
import { connect } from 'react-redux';
import DashboardComponent from '../../../components/companies/adInfo/dashboard.component';
import { changeCampaign, getJobPostViewsByDate } from '../../../actions';

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.getJobPostViewsByDate();
  }

  render() {
    const chartDataLabels = this.props.chartData.map(data => new Intl.DateTimeFormat('fi-FI').format(new Date(data.view_date)));
    /* chartDataLabels.push(
      '04.04.2020',
      '04.05.2020',
      '08.05.2020',
      '24.05.2020',
      '24.07.2020',
      '24.10.2020'
    ); */

    const chartDataCount = this.props.chartData.map(data => data.view_count);
    /*     chartDataCount.push('15', '50', '20', '30', '1', '5');
     */
    const data = {
      labels: chartDataLabels,
      datasets: [
        {
          label: '',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#88C0F7',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#88C0F7',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#88C0F7',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartDataCount,
        },
      ],
    };

    return <DashboardComponent {...this.props} data={data} />;
  }
}

const mapStateToProps = state => ({
  chartData: state.advertisement.chartData,
  campaigns: state.advertisement.campaigns,
});

const mapDispatchToProps = {
  changeCampaign,
  getJobPostViewsByDate,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
