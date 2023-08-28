function createImg(photo) {
  const img = new Image();
  img.src = photo;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
}

async function resizeImg(photo, size) {
  //const canvas = document.getElementById("imgCanvas");
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const img = await createImg(photo);
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  // Math 메소드를 활용해서 캔버스에 맞는 이미지 배율을 유지할 수 있도록 scale를 정한다

  let x = canvas.width / 2 - (img.width / 2) * scale;
  let y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
}

async function getBase64URL(file) {
  if (!file || !file.type.startsWith("image/")) throw new Error("jpeg, gif, png 형식의 이미지 파일만 업로드 할 수 있습니다.");
  // file 형식을 URL 방식으로 변경
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

export { resizeImg, getBase64URL };
