import styled from "styled-components";
import Select from "react-select";
import { colors } from "./theme/colors";
import { txt } from "src/styles/theme/typography";

interface SubmitButtonProps {
  submitted: boolean;
}

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
  padding: 20px 0;

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
  position: absolute;
  font-size: ${txt.size.small};
  bottom: -34px;
  color: ${colors.tertiary.regular};
`;

export const StyledTextarea = styled.textarea`
  position: relative;
  border: 0.5px solid ${colors.grey.two};
  border-radius: 3px;
  height: 32px;
  padding: 15px 15px 4px;
  margin-bottom: 36px;
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

export const SubmitButton = styled.input<SubmitButtonProps>`
  margin: 30px auto;
  border-width: 0;
  border-radius: 3px;
  padding: 12px 16px;
  font-size: ${txt.size.regular};
  font-family: "Asap", sans-serif;
  font-weight: ${txt.weight.semibold};
  color: #fff;
  background-color: ${(props) =>
    props.submitted ? colors.grey.four : colors.primary.light};
  cursor: ${(props) => (props.submitted ? "default" : "pointer")};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.submitted ? colors.grey.four : colors.primary.regular};
  }
`;

export const CompalingText = styled.p`
  text-align: center;
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
