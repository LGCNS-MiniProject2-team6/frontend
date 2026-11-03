import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  @media (width <= 48rem) {
    flex-direction: column;
  }

`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
`;
