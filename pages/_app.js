import Layout from '../components/layout/layout'

import { Provider } from 'react-redux';
import store from '../components/Store/index'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Layout><Component {...pageProps} /></Layout></Provider>
}

export default MyApp
