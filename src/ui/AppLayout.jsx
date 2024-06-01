import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 5rem 4rem;
  overflow: scroll;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
