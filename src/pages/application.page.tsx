import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  ApplicationStepOneInputs,
  ApplicationStepTreeInputs,
} from "src/validators/application.validator";
import { PatternFormat } from "react-number-format";
import { useStore } from "src/contexts/store.context";
import { ResponseStatus, StatusResponse } from "src/models/api.model";
import { CandidateSentencesTranslated } from "src/models/candidate.model";
import { defaultOptions } from "../data/defaultOptions";
import { defaultValues } from "src/data/defaultValues";
import {
  StyledForm,
  FormContainer,
  InputContainer,
  StyledLabel,
  StyledInput,
  SubmitButton,
  StyledTextarea,
  Headline,
  Title,
  CompalingText,
  InputError,
  InputWrapper,
  StyledSelect,
} from "src/styles/Form";
import { txt } from "src/styles/theme/typography";
import { colors } from "src/styles/theme/colors";
import { Description, Row, Spacer, Topic } from "src/styles/Theme";
import { FileInput } from "src/components/FilpeInput/FileInput";

const StyledPatternFormat = styled(PatternFormat)`
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

const resolver = classValidatorResolver(ApplicationStepOneInputs);
const resolverStep3 = classValidatorResolver(ApplicationStepTreeInputs);

type ApplicationInputs = ApplicationStepOneInputs | ApplicationStepTreeInputs;

export const Application = observer(() => {
  const {
    application: {
      name,
      cv,
      email,
      phone,
      linkedin,
      salary,
      processing,
      step,
      addCv,
      setStep,
      setTechSkills,
    },
  } = useStore();
  const [applicationStatus] = useState<StatusResponse>();
  const [cvError, setCvError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | undefined>(undefined);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationInputs>({
    resolver,
    defaultValues,
  });

  const testFormTree = useForm<ApplicationStepTreeInputs>({
    resolver: resolverStep3,
  });
  const {
    application: { registerCandidate },
  } = useStore();

  const onSubmitOne: SubmitHandler<ApplicationInputs> = useCallback(
    async (data) => {
      await registerCandidate(data as ApplicationStepOneInputs);
      // const application = await registerCandidate(data);
      // setApplicationStatus(application);
    },
    [registerCandidate]
  );

  const onSubmitTwo = useCallback(() => setStep(3), [setStep]);

  const onSubmitTree: SubmitHandler<ApplicationStepTreeInputs> = useCallback(
    async (data) => {
      console.log({ data });
      // const application = await registerCandidate(data as ApplicationStepTreeInputs);
      // setApplicationStatus(application);
    },
    []
  );

  const handleInputCv = useCallback(
    (input: HTMLInputElement) => {
      // Fazer o upload aqui e nao mandar valor nenhum para o create.
      // const allowedFormats = /(.*?)\.(pdf|doc)$/;
      const file =
        input.files?.length && input.files?.length > 0 && input.files[0];

      setFilename(input.files?.[0].name);

      if (file) {
        if (file.size < 500000) {
          setCvError(null);
          addCv(file);
        } else {
          setCvError("Seu arquivo é maior the 500KB.");
        }
      } else {
        setCvError("Campo vazio ou arquivo inválido.");
      }
    },
    [addCv]
  );

  const displayForm = useMemo(() => {
    switch (step) {
      case 1:
        const formError = errors as FieldErrors<ApplicationStepOneInputs>;
        return (
          <FormContainer>
            <StyledForm onSubmit={handleSubmit(onSubmitOne)}>
              <InputContainer>
                <StyledLabel>Nome Completo</StyledLabel>
                <InputWrapper>
                  <StyledInput {...register("name", { required: true })} />
                  {formError.name && (
                    <InputError>Favor, preencher com um nome válido</InputError>
                  )}
                </InputWrapper>
              </InputContainer>

              <InputContainer>
                <StyledLabel>E-mail</StyledLabel>
                <InputWrapper>
                  <StyledInput {...register("email", { required: true })} />
                  {formError.email && (
                    <InputError>
                      Favor, preencher com um email válido
                    </InputError>
                  )}
                </InputWrapper>
              </InputContainer>

              <InputContainer>
                <StyledLabel>Telefone</StyledLabel>
                <InputWrapper>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, name, value } }) => (
                      <StyledPatternFormat
                        format="+55 (##) ##### ####"
                        name={name}
                        value={value}
                        onChange={onChange}
                        allowEmptyFormatting
                        mask="_"
                      />
                    )}
                  />
                  {formError.phone && (
                    <InputError>
                      Favor, preencher com um número válido
                    </InputError>
                  )}
                </InputWrapper>
              </InputContainer>

              <InputContainer>
                <StyledLabel>LinkedIn</StyledLabel>
                <InputWrapper>
                  <StyledInput {...register("linkedin", { required: true })} />
                  {formError.linkedin && (
                    <InputError>
                      Favor, preencher com um endereço de URL
                    </InputError>
                  )}
                </InputWrapper>
              </InputContainer>

              <InputContainer>
                <StyledLabel>Pretensão Salarial{" (mensal)"}</StyledLabel>
                <InputWrapper>
                  <StyledInput
                    type="number"
                    {...register("salary", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {formError.salary && (
                    <InputError>Favor, preencher com um número</InputError>
                  )}
                </InputWrapper>
              </InputContainer>

              <SubmitButton type="submit" value="APLICAR PARA VAGA" />
            </StyledForm>
          </FormContainer>
        );
      case 2:
        return (
          <FormContainer>
            <StyledForm onSubmit={handleSubmit(onSubmitTwo)}>
              <Headline>Etapa 2 de 3</Headline>
              <Title>Resumo Etapa 1</Title>
              <Row>
                <Topic>Nome completo: </Topic>
                <Description>{name}</Description>
              </Row>

              <Row>
                <Topic>Email: </Topic>
                <Description>{email}</Description>
              </Row>

              <Row>
                <Topic>Telefone: </Topic>
                <Description>{phone}</Description>
              </Row>

              <Row>
                <Topic>LinkedIn: </Topic>
                <Description>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    {linkedin}
                  </a>
                </Description>
              </Row>

              <Row>
                <Topic>Pretensão Salarial: </Topic>
                <Description>{salary}</Description>
              </Row>

              <Title>CV</Title>
              <Row>
                <Topic>Envie seu CV: </Topic>
                <Description>PDF (max. 500KB)</Description>
              </Row>

              <FileInput
                handleChange={(e) => {
                  handleInputCv(e.target);
                }}
                filename={filename}
              />
              {cvError && <span>{cvError}</span>}

              <SubmitButton
                disabled={cv ? false : true}
                type="submit"
                value="AVANÇAR"
              />
            </StyledForm>
          </FormContainer>
        );
      case 3:
        const sentenceErrors = testFormTree.formState
          .errors as FieldErrors<ApplicationStepTreeInputs>;
        return (
          <FormContainer>
            <StyledForm onSubmit={testFormTree.handleSubmit(onSubmitTree)}>
              <Headline>Etapa 3 de 3</Headline>
              <Title>Resumo Etapa 3</Title>

              <Row>
                <Topic>Nome completo: </Topic>
                <Description>{name}</Description>
              </Row>

              <Row>
                <Topic>Email: </Topic>
                <Description>{email}</Description>
              </Row>

              <Row>
                <Topic>Telefone: </Topic>
                <Description>{phone || ""}</Description>
              </Row>

              <Row>
                <Topic>LinkedIn: </Topic>
                <Description>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    {linkedin}
                  </a>
                </Description>
              </Row>

              <Row>
                <Topic>Pretensão Salarial: </Topic>
                <Description>{salary}</Description>
              </Row>

              <Row>
                <Topic>CV: </Topic>
                <Description>
                  <a href={cv} target="_blank" rel="noreferrer">
                    Ver Curriculum
                  </a>
                </Description>
              </Row>

              <Title>Complete as sentenças:</Title>
              <Spacer vertical="10px" />

              <StyledLabel>
                {CandidateSentencesTranslated["I_AM"]}...
              </StyledLabel>
              <StyledTextarea
                {...testFormTree.register("i_am", { required: true })}
              />
              {sentenceErrors.i_am && (
                <InputError>
                  Favor, preencher com uma sentença válida
                </InputError>
              )}

              <StyledLabel>
                {CandidateSentencesTranslated["I_LIKE"]}...
              </StyledLabel>
              <StyledTextarea
                {...testFormTree.register("i_like", { required: true })}
              />
              {sentenceErrors.i_like && (
                <InputError>
                  Favor, preencher com uma sentença válida
                </InputError>
              )}

              <StyledLabel>
                {CandidateSentencesTranslated["I_WANT"]}...
              </StyledLabel>
              <StyledTextarea
                {...testFormTree.register("i_want", { required: true })}
              />
              {sentenceErrors.i_want && (
                <InputError>
                  Favor, preencher com uma sentença válida
                </InputError>
              )}

              <StyledLabel>
                {CandidateSentencesTranslated["I_WILL"]}...
              </StyledLabel>
              <StyledTextarea
                {...testFormTree.register("i_will", { required: true })}
              />
              {sentenceErrors.i_will && (
                <InputError>
                  Favor, preencher com uma sentença válida
                </InputError>
              )}

              <StyledLabel>
                {CandidateSentencesTranslated["I_AM_PROUD_OF"]}...
              </StyledLabel>
              <StyledTextarea
                {...testFormTree.register("i_am_proud_of", { required: true })}
              />
              {sentenceErrors.i_am_proud_of && (
                <InputError>
                  Favor, preencher com uma sentença válida
                </InputError>
              )}

              <StyledLabel>Tech Skills</StyledLabel>

              <Spacer vertical="10px" />
              <StyledSelect
                isMulti
                name="tech_skills"
                options={defaultOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setTechSkills}
              />

              <SubmitButton type="submit" value="FINALIZAR APLICAÇÃO" />
            </StyledForm>
          </FormContainer>
        );
      default:
        return (
          <p>
            The form step system need some attention. Please report to the
            support.
          </p>
        );
    }
  }, [
    step,
    errors,
    handleSubmit,
    onSubmitOne,
    register,
    control,
    onSubmitTwo,
    name,
    email,
    phone,
    linkedin,
    salary,
    filename,
    cvError,
    cv,
    testFormTree,
    onSubmitTree,
    setTechSkills,
    handleInputCv,
  ]);

  return (
    <main>
      {processing ? (
        <FormContainer>
          <CompalingText>
            Por favor aguarde, estamos processando sua aplicação
          </CompalingText>
        </FormContainer>
      ) : applicationStatus?.status === ResponseStatus.ERROR ? (
        <FormContainer>
          <CompalingText>{applicationStatus.message}</CompalingText>
        </FormContainer>
      ) : applicationStatus?.status === ResponseStatus.SUCCESS && step === 3 ? (
        <FormContainer>
          <CompalingText>{applicationStatus.message}</CompalingText>
        </FormContainer>
      ) : (
        displayForm
      )}
    </main>
  );
});
