import Vue from 'vue';

import {
  Button,
  Space,
  Icon,
  Row,
  Col,
  Spin,
  Drawer,
  Modal,
  Popover,
  ConfigProvider,
  Input,
  Select,
  // Avatar,
  // Switch,
  // Collapse,
  // Tooltip,
  Affix,
} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Space.name, Space);
Vue.component(Icon.name, Icon);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Spin.name, Spin);
Vue.component(Drawer.name, Drawer);
Vue.component(Modal.name, Modal);
Vue.component(Popover.name, Popover);
Vue.component(ConfigProvider.name, ConfigProvider);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Affix.name, Affix);
// Vue.component(Collapse.name, Collapse)
// Vue.component(Collapse.Panel.name, Collapse.Panel)
// Vue.component(Switch.name, Switch)
// Vue.component(Avatar.name, Avatar)
// Vue.component(Tooltip.name, Tooltip)

// see https://github.com/vueComponent/ant-design-vue/issues/2261#issuecomment-762270176
Drawer.install(Vue);
Modal.install(Vue);
Select.install(Vue);

const CIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2204869_zurj6qqazyg.js',
});
Vue.component('c-icon', CIcon);
