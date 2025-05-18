import { Tabs } from './tabs';

let tabs;

const initTabs = () => {
  console.log('initTabs');
  tabs = new Tabs();
  window.tabs = tabs;
};

export { initTabs, tabs };
