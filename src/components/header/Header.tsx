import React, {useState} from 'react';
import {
  Button, Dropdown, Input, Layout, Menu,
} from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import { languageStore } from '../../redux/store';

const { Search } = Input;
const mainMenuList = [
  '旅游首页',
  '周末游',
  '跟团游',
  '自由行',
  '邮轮',
  '签证',
  '机票',
  '酒店',
  '景点门票',
  '攻略',
];

export const Header:React.FC = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({...languageStore.getState()});

  languageStore.subscribe(() => {
    setState({
      ...state,
      language: languageStore.getState().language,
    })
  })

  const changeLanguage = (value: string) => {
    languageStore.dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: value
    })
  }
  const languageMenu = (
    <Menu>
      {
        state.languageList.map((item) => (
          <Menu.Item key={item.code} onClick={() => changeLanguage(item.code)}>{item.name}</Menu.Item>
        ))
      }
    </Menu>
  );
  return (
    <div>
      {/*  一级顶部栏 */}
      <Layout.Header className={styles['top-header']}>
        <span>让旅游更幸福</span>
        <Dropdown.Button className={styles['language-select']} overlay={languageMenu} icon={<GlobalOutlined />}>
          {state.languageList.find((item) => item.code === state.language)?.name}
        </Dropdown.Button>
        <div className={styles['btn-group']}>
          <Button onClick={() => navigate('/sign')}>登录</Button>
          <Button onClick={() => navigate('/register')}>注册</Button>
        </div>
      </Layout.Header>
      {/*  二级顶部栏 */}
      <Layout.Header className={styles['second-header']}>
        <img className={styles.logo} src={logo} alt="" />
        <p className={styles.title}>React 旅游网</p>
        <Search className={styles['search-input']} placeholder="请输入旅游目的地、主题、或关键字" />
      </Layout.Header>
      {/*  菜单栏 */}
      <Menu className={styles['main-menu']} mode="horizontal">
        {
          mainMenuList.map((item) => (
            <Menu.Item key={item}>{item}</Menu.Item>
          ))
        }
      </Menu>
    </div>
  );
};
