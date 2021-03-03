import Vue from 'vue'

import {
  Button,
  Space,
  Icon,
  Row,
  Col,
  Spin,
  Drawer,
  Modal,
  // Avatar,
  // Switch,
  // Collapse,
  // Tooltip,
  // Input,
} from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.component(Space.name, Space)
Vue.component(Icon.name, Icon)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Spin.name, Spin)
Vue.component(Drawer.name, Drawer)
Vue.component(Modal.name, Modal)
// Vue.component(Collapse.name, Collapse)
// Vue.component(Collapse.Panel.name, Collapse.Panel)
// Vue.component(Switch.name, Switch)
// Vue.component(Avatar.name, Avatar)
// Vue.component(Input.name, Input)
// Vue.component(Tooltip.name, Tooltip)

// see https://github.com/vueComponent/ant-design-vue/issues/2261#issuecomment-762270176
Drawer.install(Vue)
Modal.install(Vue)
