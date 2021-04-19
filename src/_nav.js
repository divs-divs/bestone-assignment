import constant from "./constants/constant";
import auth from "./utils/authentication";
function getName () {
  let authObject = new auth()
  let user = JSON.parse(authObject.getUserInfo());
  if(!user) {
    return ''
  }
}
export default {
  items: [
    {
      title: true,
      name: getName(),
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Dashboard',
      // url: '/dashboard',
      icon: 'icon-pie-chart',
    },

    {
      name: 'Check Languages',
      url: '/checkLanguages',
      icon: 'fa fa-map'
    },
  ],
};
