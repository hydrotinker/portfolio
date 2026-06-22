export function useCount() {
    const showCounter = (index: number): string => {
        return index < 9 ? `0${index + 1}` : (index + 1).toString();
    };

    return {
        showCounter,
    };
}
