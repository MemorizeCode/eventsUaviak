import { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import {
  MenuOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "@/entities/User/model/store/userSlice";
import { RootState } from "@/app/providers/store/store";

const { Header } = Layout;

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const role = useSelector((state: RootState) => state?.user?.role)
  const auth = useSelector((state: RootState) => state?.user?.auth)
  const dispatch = useDispatch()
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  async function logOut() {
    dispatch(userSliceActions.setAuth(false))
    dispatch(userSliceActions.setRole('USER'))
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  return (
    <Layout>
      <Header style={{ padding: 0 }} >
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
            <Menu theme="light" mode="horizontal" style={{ background: "white" }}>
              <Menu.Item key={"1"}>
                <NavLink to="/" style={{ fontSize: '16px' }} >ГЛАВНАЯ</NavLink>
              </Menu.Item>
              <Menu.Item key={"2"}>
                <NavLink to="/reviews" style={{ fontSize: '16px' }}>ОТЗЫВЫ</NavLink>
              </Menu.Item>
              {
                auth && role == "ADMIN" &&
                <>
                  <Menu.Item key={"3"}>
                    <NavLink to="/admin" style={{ fontSize: '16px' }}>АДМИНКА</NavLink>
                  </Menu.Item>

                  <Menu.Item key={"4"}>
                    <Button danger type="primary" onClick={logOut} style={{ fontSize: '16px' }}>ВЫЙТИ</Button>
                  </Menu.Item>
                </>
              }
              {
                !auth &&
                <Menu.Item key={"5"}>
                  <NavLink to="/login">Войти в админку</NavLink>
                </Menu.Item>
              }
            </Menu>
          </Col>
          <Col xs={2} sm={2} md={0} style={{ background: "white" }} >
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
          <Menu mode="vertical" style={{ background: "white" }} >
            <Menu.Item key={"6"}>
              <NavLink to="/">Главная</NavLink>
            </Menu.Item>
            <Menu.Item key={"7"} >
              <NavLink to="/reviews">Отзывы</NavLink>
            </Menu.Item>
            {
              auth && (role == "admin" || role == "ADMIN") &&
              <>
                <Menu.Item key={"8"}>
                  <NavLink to="/admin" >Админка</NavLink>
                </Menu.Item>

                <Menu.Item key={"9"}>
                  <Button danger type="primary" onClick={logOut} style={{ fontSize: '16px' }}>ВЫЙТИ</Button>
                </Menu.Item>
              </>

            }
            {
              !auth && <Menu.Item key={"10"}>
                <Button type="primary" style={{ marginRight: "10px" }}>
                  <NavLink to="/login">Войти в админку</NavLink>
                </Button>
              </Menu.Item>
            }
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default NavBar;