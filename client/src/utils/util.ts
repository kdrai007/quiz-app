export function randomId(len = 4) {
  let id = "";
  for (let i = 0; i < len; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}
export const userName: string = "kdrai";
