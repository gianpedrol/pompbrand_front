export const formatHour = (hour, today) => {
  if (hour) {
    const date = new Date(hour);
    const hourFormatted = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return hourFormatted;
  }

  return "";
};
