import React from "react";
import { useStore } from "src/contexts/store.context";
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
  const {
    application: { cv },
  } = useStore();

  return (
    <UploadContainer>
      <UploadButton fileUploaded={filename ? true : false}>
        <AttachIcon />
        Selecionar arquivo
        <input
          name="cv"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </UploadButton>
      {filename ? (
        <FilenameText>
          <a href={cv} target="_blank" rel="noreferrer">
            Ver {filename}
          </a>
        </FilenameText>
      ) : (
        <FilenameText>Nenhum arquivo selecionado</FilenameText>
      )}
    </UploadContainer>
  );
};
