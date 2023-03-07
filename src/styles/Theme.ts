import styled from "styled-components";
import { colors } from "../styles/theme/colors";
import { txt } from "src/styles/theme/typography";

export const Title = styled.h2`
  margin: 10px 0 0;
  font-size: ${txt.size.regular};
  font-weight: ${txt.weight.semibold};
  color: ${colors.grey.five};
`;

export const Description = styled.p`
  margin: 10px 0 20px;
  font-size: ${txt.size.regular};
  color: ${colors.grey.six};
`;

export const ListItem = styled.li`
  margin: 0px 0 5px;
  font-size: ${txt.size.regular};
  color: ${colors.grey.six};
`;

export const Row = styled.div`
  display: flex;
  gap: 6px;
`;
