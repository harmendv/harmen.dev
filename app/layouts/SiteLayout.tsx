import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Main } from "../components/layout/Main";
import { Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}