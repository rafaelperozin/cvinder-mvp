import styled from "styled-components";
import Select from "react-select";
import { colors } from "./theme/colors";
import { txt } from "src/styles/theme/typography";

export const FormContainer = styled.div`
  padding: 50px 30px 20px;
  background-color: ${colors.grey.one};
  z-index: 1;
`;

export const Headline = styled.h1`
  margin-bottom: 16px;
  font-weight: ${txt.weight.bold};
  color: ${colors.primary.dark};
`;

export const Title = styled.h2`
  font-weight: ${txt.weight.bold};
  color: ${colors.grey.nine};
`;

export const StyledForm = styled.form`
  max-width: 760px;
  margin: auto;
  padding-left: 0;
  padding-right: 0;
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 64%;
  align-items: center;
  padding: 16px 0;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const StyledLabel = styled.label`
  align-items: center;
  font-size: ${txt.size.regular};
  font-weight: ${txt.weight.semibold};
  color: ${colors.grey.seven};

  @media (max-width: 767px) {
    display: block;
    width: 94%;
    margin-bottom: 16px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  @media (max-width: 767px) {
    display: block;
    width: 94%;
  }
`;

export const StyledInput = styled.input`
  border: 0.5px solid ${colors.grey.two};
  border-radius: 3px;
  width: 100%;
  height: 32px;
  padding: 4px 4px 4px 15px;
  font-size: ${txt.size.regular};
  font-family: "Asap", sans-serif;
  color: ${colors.grey.nine};

  &:focus {
    border-color: ${colors.secondary.light};
    outline: 1px solid ${colors.secondary.light};
  }
`;

export const InputError = styled.p`
  position: relative;
  bottom: 6px;
  margin-bottom: 0;
  color: ${colors.tertiary.regular};
`;

export const StyledTextarea = styled.textarea`
  border: 0.5px solid ${colors.grey.two};
  border-radius: 3px;
  height: 32px;
  padding: 15px 15px 4px;
  margin-bottom: 30px;
  font-size: ${txt.size.regular};
  font-family: "Asap", sans-serif;
  color: ${colors.grey.nine};

  &:focus {
    border-color: ${colors.secondary.light};
    outline: 1px solid ${colors.secondary.light};
  }

  @media (max-width: 767px) {
    display: block;
    width: 94%;
  }

  @media (min-width: 767px) {
    margin-top: 10px;
  }
`;

export const SubmitButton = styled.input`
  margin: 30px auto;
  border: 1px solid ${colors.primary.light};
  border-radius: 3px;
  padding: 12px 16px;
  font-size: ${txt.size.regular};
  font-family: "Asap", sans-serif;
  font-weight: ${txt.weight.semibold};
  color: #fff;
  background-color: ${colors.primary.light};
  cursor: pointer;
  transition: all 1s;

  &:hover {
    background-color: ${colors.primary.regular};
  }
`;

export const CompalingText = styled.p`
  text-align: center;
`;

export const FileInput = styled.label`
  display: inline-block;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 12px 16px;
  color: #fff;
  background-color: ${colors.secondary.regular};
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.secondary.dark};
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const StyledSelect = styled(Select)`
  .select__control {
    height: 42px;
    border: 0.5px solid ${colors.grey.two};
    border-radius: 3px;
    padding: 0 0 0 4px;

    &:focus {
      border-color: ${colors.secondary.light};
      outline: 1px solid ${colors.secondary.light};
    }
  }

  .select__menu {
    border-radius: 3px;
  }

  .select__option {
    padding: 8px 16px;
    font-size: 14px;
  }

  .select__option--is-focused {
    background-color: ${colors.grey.one};
  }

  .select__indicator-separator {
    display: none;
  }

  .select__indicator {
    color: ${colors.grey.six};
  }
`;
