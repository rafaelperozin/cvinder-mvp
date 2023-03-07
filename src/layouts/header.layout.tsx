import {
  CompanyHighlight,
  CompanyName,
  HeaderContainer,
  HeaderContent,
  Occupation,
} from "src/styles/Header";
import { Description, ListItem, Row, Title } from "src/styles/Theme";

const activities = [
  { id: "01", text: "Reposição de produtos na loja" },
  { id: "02", text: "Precificação de produtos" },
  { id: "03", text: "Impressão de etiquetas de preços" },
  { id: "04", text: "Atendimento ao cliente para esclarecimento de dúvidas" },
  { id: "05", text: "Conduzir o cliente ao setor procurado" },
  { id: "06", text: "Manter o setor organizado" },
];

const requirements = [
  {
    id: "1",
    text: "Escolaridade: Ensino médio completo, ou cursando no período noturno",
  },
  { id: "2", text: "Disponibilidade de horario" },
];

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <CompanyName>
          CV<CompanyHighlight>inder</CompanyHighlight>
        </CompanyName>
        <Occupation>Jovem Aprendiz</Occupation>
        <Description>
          O Programa de Jovem Aprendiz tem objetivo de capacitar e aprimorar
          profissionalmente os jovens, dando a eles oportunidade de colocar seus
          conhecimentos em prática e desenvolver habilidades técnicas e
          comportamentais que os auxiliarão em seu desenvolvimento profissional
          e os prepararão para o mundo corporativo.
        </Description>
        <Title>Atividades:</Title>
        <ul>
          {activities.map(({ id, text }) => (
            <ListItem key={id}>{text}</ListItem>
          ))}
        </ul>
        <Title>Requisitos:</Title>
        <ul>
          {requirements.map(({ id, text }) => (
            <ListItem key={id}>{text}</ListItem>
          ))}
        </ul>
        <Row>
          <Title>Local: </Title>
          <Description>
            R. da Cantareira, 306 - Centro Histórico de São Paulo, São Paulo -
            SP,
          </Description>
        </Row>
        <Row>
          <Title>Horário:</Title>
          <Description>A definir (4 horas por dia)</Description>
        </Row>
      </HeaderContent>
    </HeaderContainer>
  );
};
