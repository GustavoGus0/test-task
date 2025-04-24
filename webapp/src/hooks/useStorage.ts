export const useStorage = () => {
  return {
    getItem: (parameter: string) => localStorage.getItem(parameter),
    setItem: (parameter: string, value: string | null) =>
      value === null ? localStorage.removeItem(parameter) : localStorage.setItem(parameter, value),
    removeItem: (parameter: string) => localStorage.removeItem(parameter),
  }
}
