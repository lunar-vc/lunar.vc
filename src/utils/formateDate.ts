const getFormattedDate = (date: Date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

  export {getFormattedDate};