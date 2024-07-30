import styled from 'styled-components';

export const TreeViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 68vh; 
  overflow-y: auto;

    &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Content = styled.div`
  background-color: white;
  margin: 0.7rem;
  border-radius: 4px;
  width: 100%;
`;

export const SubHeader = {
  Container: styled.div`
    display: flex;
    height: 5%;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1.2rem;
  `,
  Title: styled.span`
    font-size: x-large;
    font-weight: bold;
    color: black;
  `,
  MenuButtons: styled.span`
    display: flex;
    gap: 2vh;
    justify-content: flex-end;
  `,
  FilterButton: styled.button<{ $selected: boolean }>`
    background-color: ${({ $selected }) => ($selected ? '#2188FF' : '#FFFFFF')};
    color: ${({ $selected }) => ($selected ? '#FFFFFF' : '#77818C')};
    border-radius: 8px;
    border: 2px solid #D8DFE6;
    cursor: pointer;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    border: none;
    display: flex;
    align-items: center;
    height: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #2188FF;
      color: #FFFFFF;
    }
  `,
};

export const Box = {
  MenuCard: styled.div`
    display: flex;
    padding: 0.7rem 1.2rem;
    align-items: flex-start;
    gap: 2vh;
  `,
  Card: styled.div`
    display: flex;
    height: 78vh;
    border-radius: 4px;
    border: 1px solid #D8DFE6;
  `,
};

export const TreeBar = {
  Container: styled.div`
    width: 100%;
  `,
  InputSearchContainer: styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
  `,
  InputSearch: styled.input`
    background-color: #ffffff;
    font-size: 1rem;
    color: black;
    width: 100%;
    padding: 1rem;
    border: 2px solid #f1f1f1;
    border-radius: 4px;
    box-sizing: border-box;
    padding-right: 30px;
  `,
  TreeNode: styled.div`
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    cursor: pointer;
  `,
  TreeNodeLabel: styled.span`
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  `,
  TreeNodeIcon: styled.span`
    margin-right: 0.5rem;
  `,
  Indent: styled.div`
    margin-left: 3rem;
  `,
  TreeNodeStatus: styled.span`
    margin-left: auto;
  `,
  Icon: styled.img`
    width: 16px;
  `,
  ArrowIcon: styled.img`
    width: 12px;
    margin-right: 8px;
  `,
  SearchIcon: styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  `,
};

export const OperatingIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 4px;
`;

export const InfoCard = {
  Container: styled.div`
    width: 100%;
  `,
  Header: styled.div`
    display: flex;
    height: 5%;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1.2rem;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
  `,
  Title: styled.span`
    font-size: x-large;
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
  `,
  Body: styled.div`
    padding: 1.2rem;
  `,
  Sections: styled.div`
    display: flex;
  `,
  SubTitle: styled.span`
    font-size: large;
    font-weight: 500;
    color: black;
    display: flex;
    align-items: center;
  `,
  Text: styled.span`
    font-size: large;
    color: #77818C;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
  `,
  TextContainer: styled.div`
    display: flex;
    align-items: center;
  `,
};