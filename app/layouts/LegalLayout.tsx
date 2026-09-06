import { Main } from "../components/layout/Main";
import { Outlet } from "react-router";

export default function LegalLayout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  )
}