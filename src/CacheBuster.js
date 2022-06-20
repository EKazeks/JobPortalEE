import React from 'react';
import packageJson from '../package.json';
import moment from 'moment';

const buildDateGreaterThan = (latestDate, currentDate) => {
  const momLatestDateTime = moment(latestDate);
  const momCurrentDateTime = moment(currentDate);
  if (momLatestDateTime.isAfter(momCurrentDateTime)) {
    return true;
  } else {
    return false;
  }
};
class CacheBuster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLatestVersion: false,
      refreshCacheAndReload: () => {
        //console.log('-----------Clearing cache and hard reloading...')
        if (caches) {
          caches.keys().then(async function(names) {
            await Promise.all(names.map(name => caches.delete(name)));
          });
        }
        // delete browser cache and hard reload
        window.location.reload();
      },
    };
  }

  componentDidMount() {
    fetch('/meta.json')
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.buildDate;
        const currentVersion = packageJson.buildDate;
        const shouldForceRefresh = buildDateGreaterThan(latestVersion, currentVersion);
        //console.log ('-------------shouldForceRefresh-->>', shouldForceRefresh)
        if (shouldForceRefresh) {
          //console.log(`We have a new version - ${latestVersion}. Should force refresh`)
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          //console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`)
          this.setState({ loading: false, isLatestVersion: true });
        }
      });
  }

  render() {
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({
      loading,
      isLatestVersion,
      refreshCacheAndReload,
    });
  }
}
export default CacheBuster;
