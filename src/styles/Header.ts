import styled from "styled-components";
import { colors } from "../styles/theme/colors";
import { txt } from "src/styles/theme/typography";

export const HeaderContainer = styled.header`
  justify-content: center;
  align-items: center;
  padding: 20px 30px 30px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 760px;
  margin: auto;
  padding-left: 0;
  padding-right: 0;
`;

export const CompanyName = styled.h1`
  margin-top: 20px;
  font-size: ${txt.size.giant};
  font-weight: ${txt.weight.extrabold};
  color: ${colors.primary.regular};
`;

export const CompanyHighlight = styled.span`
  margin-top: 20px;
  font-size: ${txt.size.giant};
  color: ${colors.tertiary.light};
`;

export const Occupation = styled.h3`
  margin-bottom: 20px;
  font-size: ${txt.size.h1};
  color: ${colors.primary.dark};
`;
