import React from "react";
import {
  AttachIcon,
  FilenameText,
  UploadButton,
  UploadContainer,
} from "./styles";

interface FileInputProps {
  handleChange: (e: { target: HTMLInputElement }) => void;
  filename?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  handleChange,
  filename = false,
}) => {
  return (
    <UploadContainer>
      <UploadButton>
        <AttachIcon />
        Selecionar arquivo
        <input
          name="cv"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          required
          style={{ display: "none" }}
        />
      </UploadButton>
      {filename ? (
        <FilenameText>{filename}</FilenameText>
      ) : (
        <FilenameText>Nenhum arquivo selecionado</FilenameText>
      )}
    </UploadContainer>
  );
};
