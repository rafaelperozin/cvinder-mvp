import styled from "styled-components";
import { colors } from "../styles/theme/colors";
import { txt } from "src/styles/theme/typography";

export const Topic = styled.h2`
  margin: 10px 0 0;
  font-size: ${txt.size.regular};
  font-weight: ${txt.weight.semibold};
  color: ${colors.grey.eight};
`;

export const Description = styled.p`
  margin: 10px 0 20px;
  font-size: ${txt.size.regular};
  color: ${colors.grey.six};
`;

export const ListItem = styled.li`
  font-size: ${txt.size.regular};
  color: ${colors.grey.six};
`;

export const Row = styled.div`
  display: flex;
  gap: 6px;

  @media (max-width: 767px) {
    display: block;
  }
`;
