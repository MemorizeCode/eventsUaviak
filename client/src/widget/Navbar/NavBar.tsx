import { useState } from "react";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import Button from "antd/es/button";
import Drawer from "antd/es/drawer";
import Row from "antd/es/row";
import Col from "antd/es/col";
import { MenuOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "@/entities/User/model/store/userSlice";
import { RootState } from "@/app/providers/store/store";
import $api from "@/app/config/api";

const { Header } = Layout;

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const role = useSelector((state: RootState) => state?.user?.role);
  const auth = useSelector((state: RootState) => state?.user?.auth);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logOut = async () => {
    try{
      await $api.post('/auth/logout')
      dispatch(userSliceActions.setAuth(false));
      dispatch(userSliceActions.setRole("USER"));
      localStorage.removeItem("accessToken");
    }catch(error){
      console.log("ошибка логаута")
    }
  };

  //основа
  const mainMenuItems = [
    {
      key: "1",
      label: <NavLink to="/" style={{ fontSize: "16px" }}>ГЛАВНАЯ</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/reviews" style={{ fontSize: "16px" }}>ОТЗЫВЫ</NavLink>,
    },
    ...(!auth
      ? [
        {
          key: "8",
          label: <NavLink to="/login" style={{ fontSize: "16px" }}>ВОЙТИ</NavLink>,
        },
      ]
      : []),
    ...(auth && (role === "ADMIN" || role === "admin")
      ? [
        {
          key: "3",
          label: <NavLink to="/admin" style={{ fontSize: "16px" }}>АДМИНКА</NavLink>,
        },
        {
          key: "4",
          label: (
            <Button danger type="primary" onClick={logOut} style={{ fontSize: "16px" }}>
              ВЫЙТИ
            </Button>
          ),
        },
      ]
      : [])
  ];

  //адаптив
  const drawerMenuItems = [
    {
      key: "6",
      label: <NavLink to="/">Главная</NavLink>,
    },
    {
      key: "7",
      label: <NavLink to="/reviews">Отзывы</NavLink>,
    },
    ...(auth && (role === "ADMIN" || role === "admin")
      ? [
        {
          key: "8",
          label: <NavLink to="/admin">Админка</NavLink>,
        },
        {
          key: "9",
          label: (
            <Button danger type="primary" onClick={logOut} style={{ fontSize: "16px" }}>
              ВЫЙТИ
            </Button>
          ),
        },
      ]
      : []),
    ...(!auth
      ? [
        {
          key: "10",
          label: (
            <Button type="primary" style={{ marginRight: "10px" }}>
              <NavLink to="/login">Войти в админку</NavLink>
            </Button>
          ),
        },
      ]
      : []),
  ];

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <style>
          {`
              .ant-menu-item a.active {
                color: #456B92 !important;
                text-decoration: none !important;
              }
            `}
        </style>
        <Row justify="space-between" align="middle" style={{ background: "white" }}>
          <Col xs={0} sm={0} md={20}>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ background: "white" }}
              items={mainMenuItems}
            />
          </Col>
          <Col xs={2} sm={2} md={0} style={{ background: "white" }}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Меню"
          placement="right"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <Menu
            mode="vertical"
            style={{ background: "white" }}
            items={drawerMenuItems} 
          />
        </Drawer>
      </Header>
    </Layout>
  );
};

export default NavBar;