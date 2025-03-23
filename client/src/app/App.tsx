import { Suspense, useEffect } from "react"
import AppRouter from "./providers/router/ui/AppRouter"
import NavBar from "@/widget/Navbar/NavBar"
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { fetchIsAuth } from "@/entities/User/model/service/fetchIsAuth";

const App = () => {
  const { Content, Header } = Layout;
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchIsAuth())
  },[dispatch])

  return (
    <>
      <Suspense fallback="Loading...">
        <Layout className="Container" style={{ background:"white"}}>
          <Header className="Header" style={{background:"white"}}>
            <NavBar />
          </Header>
          <Content style={{minHeight: "calc(100vh - 114px)", margin:"30px", background:"white", borderRadius:'8px'}}>
            <Suspense fallback="Loading...">
              <AppRouter/>
            </Suspense>
          </Content>
        </Layout>
      </Suspense>
    </>
  )
}

export default App
