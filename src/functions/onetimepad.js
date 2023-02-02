export const getRandomKey = async () => {
  const response = await fetch('/api/randomkey')
  const result = await response.blob().
  console.log(result);
}

export async function oneTimePass() {
  await getRandomKey()
}