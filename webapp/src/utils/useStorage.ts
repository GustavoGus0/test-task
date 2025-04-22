export const useStorage = () => {
  return {
    getItem: (parameter: string) => localStorage.getItem(parameter),
    setItem: (parameter: string, value: string) => localStorage.setItem(parameter, value),
  }
}
