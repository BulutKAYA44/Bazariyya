const downloadBase64File = (fileData, fileName) => {
  const fileUrl = `data:application/octet-stream;base64,${fileData}`;

  const link = document.createElement("a");

  link.href = fileUrl;

  link.setAttribute("download", fileName);

  document.body.appendChild(link);

  link.click();

  link.remove();
};

export default downloadBase64File;