import ReactOnRails from 'react-on-rails';

import App from './app'
import AdminEdit from '../packs/adminEdit'
import Admin from '../packs/admin'



// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App, AdminEdit, Admin
});
