import * as React from 'react';
import './App.css';


import { Avatar, Layout, Menu } from 'antd';
const { Header } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', float: 'left' }}>
            <Menu.Item key="1">home</Menu.Item>
            <Menu.Item key="2">notice</Menu.Item>
            <Menu.Item key="3">plan</Menu.Item>
          </Menu>
          <div style={{ float: 'right' }}>
            <Avatar style={{ background: '#00a2ae' }}>P</Avatar>
          </div>
        </Header>

      </Layout>
    );
  }
  public handleChange(num: any) {
    console.log(num)
  }
}

export default App;
