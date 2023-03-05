export interface CreateCandidateInput {
  name: string;
  phone: string;
  title: string;
  linkedin: string;
  level: CandidateLevel;
  salary: number;
  tags: any[];
  cityId: string;
}

export enum CandidateLevel {
  intern = "ESTAGIARIO",
  graduate = 'TREINEE',
  assistance = 'ASSISTENTE',
  junior = "JUNIOR",
  intermediate = "PLENO",
  senior = "SENIOR",
  lead = "LIDER",
  coordinator = "COORDENADOR",
  manager = "GERENTE",
  senior_manager = "GERENTE_SENIOR",
  diretor = "DIRETOR",
  freelancer = "FREELANCER",
  temporary = "TEMPORARIO"
}

export enum AvailableTags {
  REMOTE = 'REMOTE',
  VISA_SPONSOR = 'VISA_SPONSOR',
  FULL_TIME = 'FULL_TIME',
}

export enum CandidateSentences {
  i_am = "I_AM",
  i_like = "I_LIKE",
  i_want = "I_WANT",
  i_will = "I_WILL",
  i_am_proud_of = "I_AM_PROUD_OF"
}

export enum CandidateSentencesTranslated {
  I_AM = "Eu sou",
  I_LIKE = "Eu gosto",
  I_WANT = "Eu quero",
  I_WILL = "Eu vou",
  I_AM_PROUD_OF = "Eu tenho orgulho de"
}
