export const formatDate = (date, type) => {
  const newDate = new Date(date);

  if (date && type === "extense") {
    const weekDay = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${listWeek[weekDay]}, ${day} de ${listMonth[month]} de ${year}`;
  }

  return newDate?.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const listWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const listMonth = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
