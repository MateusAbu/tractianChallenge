import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: auto;
  flex-grow: 1;
  box-sizing: border-box;
`;

export const Header = {
  Container: styled.div`
    display: flex;
    height: 5%;
    background-color: #1a1a2e;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1.2rem;
  `,
  Logo: styled.img`
    height: 2vh;
  `,
  Menu: styled.span`
    display: flex;
    gap: 2vh;
    justify-content: flex-end;
  `,
  MenuButton: styled.button<{ $selected: boolean }>`
  background-color: ${({ $selected }) => $selected ? '#2188FF' : '#023B78'};
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  border: none;
  display: flex;
  align-items: center;
  height: 2rem;
  &:hover {
    background-color: #2188FF;
  }
`
};