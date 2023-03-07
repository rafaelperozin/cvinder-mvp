import styled from "styled-components";
import { colors } from "../styles/theme/colors";
import { txt } from "src/styles/theme/typography";

export const HeaderContainer = styled.header`
  justify-content: center;
  align-items: center;
  padding: 20px 30px 30px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
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
