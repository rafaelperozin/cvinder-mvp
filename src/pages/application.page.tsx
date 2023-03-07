import React, { useCallback, useMemo, useState } from "react";
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
import Select from "react-select";

const resolver = classValidatorResolver(ApplicationStepOneInputs);
const defaultValues = {
  name: "Rafa El",
  email: "test30@test.com",
  phone: "+55 (13) 72222 5695",
  linkedin: "https://linkedin.com/in/rafaelep",
  salary: 232323,
};

const defaultOptions = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "react", label: "React.js" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
  { value: "next", label: "Next.js" },
  { value: "native", label: "React Native" },
  { value: "node", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "php", label: "PHP" },
  { value: "laravel", label: "Laravel" },
  { value: "ruby", label: "Ruby" },
  { value: "c", label: "C#" },
  { value: "plus", label: "C++" },
  { value: "flutter", label: "Flutter" },
  { value: "kotlin", label: "Kotlin" },
  { value: "go", label: "Go" },
];

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
  const [applicationStatus, setApplicationStatus] = useState<StatusResponse>();
  const [cvError, setCvError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationInputs>({
    resolver,
    defaultValues,
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

  const onSubmitTree: SubmitHandler<ApplicationInputs> = useCallback(
    async (data) => {
      console.log({ data });
      // const application = await registerCandidate(data);
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
          <form onSubmit={handleSubmit(onSubmitOne)}>
            <label>Nome Completo</label>
            <input {...register("name", { required: true })} />
            {formError.name && <span>{formError.name.message}</span>}

            <label>E-mail</label>
            <input {...register("email", { required: true })} />
            {formError.email && <span>{formError.email.message}</span>}

            <label>Telefone</label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, name, value } }) => (
                <PatternFormat
                  format="+55 (##) ##### ####"
                  name={name}
                  value={value}
                  onChange={onChange}
                  allowEmptyFormatting
                  mask="_"
                />
              )}
            />
            {formError.phone && <span>{formError.phone.message}</span>}

            <label>LinkedIn</label>
            <input {...register("linkedin", { required: true })} />
            {formError.linkedin && <span>{formError.linkedin.message}</span>}

            <label>Pretensão Salarial{"(mensal)"}</label>
            <input
              type="number"
              {...register("salary", { required: true, valueAsNumber: true })}
            />
            {formError.salary && <span>{formError.salary.message}</span>}

            <input type="submit" value="Aplicar Para Vaga" />
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit(onSubmitTwo)}>
            <h1>Etapa 2 de 3</h1>
            <h2>Resumo Etapa 1</h2>
            <p>Nome Completo: {name}</p>
            <p>E-mail: {email}</p>
            <p>Telefone: {phone}</p>
            <p>
              LinkedIn:{" "}
              <a href={linkedin} target="_blank" rel="noreferrer">
                {linkedin}
              </a>
            </p>
            <p>Pretensão Salarial: {salary}</p>

            <label>CV</label>
            <span>
              Envie seu CV em formato PDF - Tamanho max. do arquivo: 500KB
            </span>
            <input
              name="cv"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleInputCv(e.target)}
              required
            />
            {cvError && <span>{cvError}</span>}

            <input type="submit" value="Avançar" />
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleSubmit(onSubmitTree)}>
            <h1>Etapa 3 de 3</h1>
            <h2>Resumo Etapa 3</h2>
            <p>Nome Completo: {name}</p>
            <p>E-mail: {email}</p>
            <p>Telefone: {phone}</p>
            <p>
              LinkedIn:{" "}
              <a href={linkedin} target="_blank" rel="noreferrer">
                {linkedin}
              </a>
            </p>
            <p>Pretensão Salarial: {salary}</p>
            <p>
              CV:{" "}
              <a href={cv} target="_blank" rel="noreferrer">
                Ver Curriculum
              </a>
            </p>

            <h2>Complete as sentenças:</h2>

            <label>{CandidateSentencesTranslated["I_AM"]}...</label>
            <textarea {...register("i_am", { required: true })} />

            <label>{CandidateSentencesTranslated["I_LIKE"]}...</label>
            <textarea {...register("i_like", { required: true })} />

            <label>{CandidateSentencesTranslated["I_WANT"]}...</label>
            <textarea {...register("i_want", { required: true })} />

            <label>{CandidateSentencesTranslated["I_WILL"]}...</label>
            <textarea {...register("i_will", { required: true })} />

            <label>{CandidateSentencesTranslated["I_AM_PROUD_OF"]}...</label>
            <textarea {...register("i_am_proud_of", { required: true })} />

            <label>Tech Skills</label>
            <Select
              isMulti
              name="tech_skills"
              options={defaultOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setTechSkills}
            />

            <input type="submit" value="Finalizar Aplicação" />
          </form>
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
    control,
    cv,
    cvError,
    email,
    errors,
    handleInputCv,
    handleSubmit,
    linkedin,
    name,
    onSubmitOne,
    onSubmitTree,
    onSubmitTwo,
    phone,
    register,
    salary,
    setTechSkills,
    step,
  ]);

  return (
    <main>
      {processing ? (
        <p>Por favor aguarde, estamos processando sua aplicação</p>
      ) : applicationStatus?.status === ResponseStatus.ERROR ? (
        <p>{applicationStatus.message}</p>
      ) : applicationStatus?.status === ResponseStatus.SUCCESS && step === 3 ? (
        <p>{applicationStatus.message}</p>
      ) : (
        displayForm
      )}
    </main>
  );
});
