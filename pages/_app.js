import '../styles/globals.scss'
import Contentlayout from '../shared/layout-components/layout/content-layout'
import Landingpagelayout from '../shared/layout-components/layout/landingpage-layout'
import Switcherlayout from '../shared/layout-components/layout/switcher-layout'
import Authenticationlayout from '../shared/layout-components/layout/authentication-layout'
import { SSRProvider } from 'react-bootstrap';

const layouts = {
  Contentlayout: Contentlayout,
  Landingpagelayout: Landingpagelayout,
  Switcherlayout: Switcherlayout,
  Authenticationlayout: Authenticationlayout,
};
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((pageProps) => <Component>{pageProps}</Component>);
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
