import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-bottom: 32px;
  position: relative;
`;

export const Title = styled.p`
  color: #8a8a89;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.28;
  margin-bottom: 8px;
`;

export const NotFound = styled.p`
  margin-bottom: 32px;
  color: #ca0000ba;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
`;

export const Em = styled.em`
  font-style: normal;
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  color: #000;
  background-color: transparent;
  transition: color var(--transition);

  position: absolute;
  bottom: 20px;
  transform: translate(0, -15px);

  &:hover,
  :focus {
    color: var(--active-color);
  }

  & svg {
    width: 26px;
    height: 26px;
  }
`;