import { colors } from "src/styles/theme/colors";
import { txt } from "src/styles/theme/typography";
import styled from "styled-components";
import { FaPaperclip } from "react-icons/fa";

export const UploadButton = styled.label`
  display: inline-block;
  padding: 12px 16px;
  border-radius: 4px;
  color: #fff;
  background-color: ${colors.secondary.regular};
  cursor: pointer;
  font-size: ${txt.size.regular};
  font-weight: ${txt.weight.semibold};
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.secondary.dark};
  }
`;

export const AttachIcon = styled(FaPaperclip)`
  margin-right: 8px;
`;

export const FilenameText = styled.span`
  margin-left: 16px;
  font-size: 14px;
  color: #666;
`;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
`;
