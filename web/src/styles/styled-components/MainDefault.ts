import styled from 'styled-components';

export const MainDefault = styled.section`
  box-sizing: border-box;
  min-height: calc(100vh - 70px);
  padding: 20px;
  margin: 22px;
  background: #FFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin: .3rem;
    padding: 0 10px;
  }
`;