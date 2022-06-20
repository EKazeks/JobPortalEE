import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CacheBuster from './CacheBuster';
import store, { persistor } from './store';
import Routes from './routes';
import theme from './styles/customTheme';
import HistoryListener from './HistoryListener';
import { SEO } from './components/seo/metaInfo.component';

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PersistGate persistor={persistor} loading={null}>
            <CacheBuster>
              {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                  refreshCacheAndReload();
                }
                return <div></div>;
              }}
            </CacheBuster>
            <HistoryListener>
              <HelmetProvider>
                <SEO />
                <Routes />
              </HelmetProvider>
            </HistoryListener>
          </PersistGate>
        </ThemeProvider>
      </Provider>
    );
  }
}
