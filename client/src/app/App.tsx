import { Suspense, useEffect } from "react"
import AppRouter from "./providers/router/ui/AppRouter"
import NavBar from "@/widget/Navbar/NavBar"
import Layout from "antd/es/layout";
import { useDispatch } from "react-redux";
import { fetchIsAuth } from "@/entities/User/model/service/fetchIsAuth";
import { AppDispatch } from "./providers/store/store";

const { Content, Header } = Layout;
const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchIsAuth())
  }, [dispatch])


  //смешняфка
  useEffect(() => {
    let keyWorld: string = '';
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'h':
          keyWorld += 'h'
          break
        case 'i':
          keyWorld += 'i'
          break
        default:
          keyWorld = '';
          return;
      }
      if (keyWorld === 'hi') {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        keyWorld = ''
      }
    })

    return () => {
      window.removeEventListener('keydown', () => {})
    }
  }, [])
  return (
    <>
      <Suspense fallback="Загрузка...">
        <Layout className="Container" style={{ background: "white" }}>
          <Header className="Header" style={{ background: "white" }}>
            <NavBar />
          </Header>
          <Content style={{ minHeight: "calc(100vh - 114px)", margin: "30px", background: "white", borderRadius: '8px' }}>
            <Suspense fallback="Загрузка...">
              <AppRouter />
            </Suspense>
          </Content>
        </Layout>
      </Suspense>
    </>
  )
}

export default App
