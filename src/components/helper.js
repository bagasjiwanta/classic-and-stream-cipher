export const download = (blob, type, name) => {
  const element = document.createElement("a");
  const file = new Blob([blob], { type: type });
  element.href = URL.createObjectURL(file);
  element.download = name;
  document.body.appendChild(element);
  element.click();
  element.remove();
};

export const alphabetOnly = (string) => /^$|^[a-z]+$/i.test(string);

export const asciiOnly = (string) => /^$|^[\x00-\xFF]+$/i.test(string);
