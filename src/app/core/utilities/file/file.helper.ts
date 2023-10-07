export function saveFile(name: string, file: Blob | MediaSource) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
}

export function getFileName(data: any) {
  return data.headers.get('content-disposition')?.split('"')[1];
}
