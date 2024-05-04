const locale = localStorage.getItem("locale");

const dateFormatter = (ms) => new Intl.DateTimeFormat(locale === "tr" ? "tr-TR": "en-EN").format(new Date(ms));

export default dateFormatter;
