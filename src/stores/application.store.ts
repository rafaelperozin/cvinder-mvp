import apiConnect from "src/api/connect";
import {
  AccountSchema,
  AccountType,
  CreateAccountInput,
} from "src/models/account.models";
import { ResponseStatus } from "src/models/api.model";
import { AuthenticationInput, LoginResponse } from "src/models/auth.model";
import {
  AvailableTags,
  CandidateLevel,
  CandidateSentences,
  CreateCandidateInput,
} from "src/models/candidate.model";
import { cast, flow, types } from "mobx-state-tree";
import { AxiosResponse } from "axios";
import { ApplicationStoreInitialState } from "src/stores/initial-states/application.state";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const multipartHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const ApplicationStore = types
  .model("ApplicationStore", {
    userToken: types.maybe(types.string),
    id: types.maybe(types.string),
    email: types.maybe(types.string),
    type: types.enumeration<AccountType>(
      "AccountType",
      Object.values(AccountType)
    ),
    tempPass: types.string,
    name: types.maybe(types.string),
    phone: types.maybe(types.string),
    title: types.string,
    linkedin: types.maybe(types.string),
    level: types.enumeration<CandidateLevel>(
      "CandidateLevel",
      Object.values(CandidateLevel)
    ),
    salary: types.number,
    tags: types.frozen<AvailableTags[]>(),
    cityId: types.string,
    cv: types.maybe(types.string),
    techSkills: types.maybe(types.array(types.string)),
    tempVerificationToken: types.maybe(types.string),
    isAuthenticated: types.boolean,
    processing: types.boolean,
    step: types.number,
  })
  .actions((self) => ({
    setUserToken: (token: string) => (self.userToken = token),
    setId: (id: string) => (self.id = id),
    setEmail: (email: string) => (self.email = email),
    setName: (name: string) => (self.name = name),
    setPhone: (phone: string) => (self.phone = phone),
    setLinkedin: (linkedin: string) => (self.linkedin = linkedin),
    setProcessing: (processing: boolean) => (self.processing = processing),
    setStep: (step: number) => (self.step = step),
    setTechSkills: (value: any) => {
      const skills = value.map((skill: any) => skill.value);
      self.techSkills = cast(skills);
    },
  }))
  .actions((self) => ({
    createAccount: flow(function* ({
      email,
      password,
      type,
    }: CreateAccountInput) {
      console.log("CHEGOU");
      try {
        const accountInfo = {
          email,
          password,
          type,
          validateEmailOnFront: true,
        };
        const { data }: AxiosResponse<AccountSchema> = yield apiConnect.post(
          "/account",
          accountInfo
        );
        self.email = email;
        self.id = data.id;
        self.tempVerificationToken = data.verificationToken;
        return {
          status: ResponseStatus.SUCCESS,
          message: "Authenticated",
        };
      } catch (error) {
        throw error;
      }
    }),
    validateAccount: flow(function* (token: string) {
      try {
        yield apiConnect.post(`/account/validate-email/${token}`);
        return {
          status: ResponseStatus.SUCCESS,
          message: "Authenticated",
        };
      } catch (error) {
        throw error;
      }
    }),
    authenticate: flow(function* ({ email, password }: AuthenticationInput) {
      try {
        const { data }: AxiosResponse<LoginResponse> = yield apiConnect.post(
          "/auth/login",
          { email, password }
        );
        self.isAuthenticated = true;
        self.userToken = data.token;
        return {
          status: ResponseStatus.SUCCESS,
          message: "Authenticated",
        };
      } catch (error) {
        throw error;
      }
    }),
    createCandidate: flow(function* (input: CreateCandidateInput) {
      try {
        console.log("createCandidate", typeof input);
        const response = yield apiConnect.post("/candidate", input);
        console.log("createCandidate response", response);
        return {
          status: ResponseStatus.SUCCESS,
          message: "Candidate created",
        };
      } catch (error) {
        throw error;
      }
    }),
    addCv: flow(function* (file: File) {
      self.processing = true;
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = yield apiConnect.post(
          "/candidate/cv",
          formData,
          multipartHeader
        );
        self.cv = response.data.cv;
        self.processing = false;

        return {
          status: ResponseStatus.SUCCESS,
          message: "CV added succesfully",
        };
      } catch (error) {
        self.processing = false;
        throw error;
      }
    }),
    completeApplication: flow(function* (
      i_am: string,
      i_am_proud_of: string,
      i_like: string,
      i_want: string,
      i_will: string
    ) {
      self.processing = true;

      const sentences = {
        candidateSentences: [
          i_am && {
            candidateSentenceType: "I_AM",
            sentence: i_am,
          },
          i_am_proud_of && {
            candidateSentenceType: "I_AM_PROUD_OF",
            sentence: i_am_proud_of,
          },
          i_like && {
            candidateSentenceType: "I_LIKE",
            sentence: i_like,
          },
          i_want && {
            candidateSentenceType: "I_WANTM",
            sentence: i_want,
          },
          i_will && {
            candidateSentenceType: "I_WILL",
            sentence: i_will,
          },
        ],
      };

      console.log({ sentences });

      if (sentences.candidateSentences.length > 0) {
        try {
          const response = yield apiConnect.post(
            "/candidate/sentences",
            sentences,
            multipartHeader
          );
          console.log(response.data);
          return {
            status: ResponseStatus.SUCCESS,
            message: "Sentences added succesfully",
          };
        } catch (error) {
          throw error;
        }
      }

      if (self.techSkills && self.techSkills.length > 0) {
        console.log("self.techSkills", self.techSkills);
        try {
          const response = yield apiConnect.post(
            "/candidate/tecskills",
            self.techSkills,
            multipartHeader
          );
          self.techSkills = response.data.techSkills;
          self.processing = false;

          return {
            status: ResponseStatus.SUCCESS,
            message: "techSkills added succesfully",
          };
        } catch (error) {
          self.processing = false;
          throw error;
        }
      }

      self.processing = false;
    }),
  }))
  .actions((self) => ({
    registerCandidate: flow(function* (
      data: Partial<CreateCandidateInput & CreateAccountInput>
    ) {
      self.processing = true;
      self.name = data.name;
      self.email = data.email;
      self.phone = `+${data.phone!.replace(/\D+/g, "")}`;
      self.linkedin = data.linkedin;

      const candidateInfo = {
        name: self.name!,
        email: self.email,
        phone: self.phone,
        title: self.title,
        linkedin: self.linkedin!,
        level: self.level,
        salary: self.salary,
        tags: self.tags,
        cityId: self.cityId,
      };
      // console.warn({data})
      const response = yield self
        .createAccount({
          email: data.email!,
          password: self.tempPass,
          type: self.type! as AccountType,
        })
        .then(() =>
          self.authenticate({ email: data.email!, password: self.tempPass })
        )
        .then(() => self.validateAccount(self.tempVerificationToken!))
        .then(() => self.createCandidate(candidateInfo))
        .catch(() => ({
          status: ResponseStatus.ERROR,
          message: "Sua aplicação falhou. Tente com outro email.",
        }));
      console.log("store step", self.step);
      self.step++;
      console.log("store step new", self.step);
      self.processing = false;
      return response;
    }),
  }));

export const makeApplicationStore = ApplicationStore.create(
  ApplicationStoreInitialState
);
