const priceFormat = (price) => {
    var formattedOutput = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
    });

    return price ? formattedOutput.format(price) : 0;
};

export default priceFormat;
