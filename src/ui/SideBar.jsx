import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding: 3rem 3rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function SideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default SideBar;
