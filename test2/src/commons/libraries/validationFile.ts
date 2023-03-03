export const checkValidationFile = (file?: File): boolean => {
  if (typeof file === "undefined") {
    alert("파일이 없습니다.");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큽니다. (제한: 5MB)");
    return false;
  }

  if (
    !file.type.includes("jpeg") &&
    !file.type.includes("png") &&
    !file.type.includes("gif")
  ) {
    alert("jpeg 또는 png파일만 업로드 가능합니다.");
    return false;
  }
  // 인풋에 accept 적어주면 자체적으로 막아줄 수 있음 둘중에 원하는 걸로 적용
  return true;
};
