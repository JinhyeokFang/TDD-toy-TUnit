export default function assertEqualBoolean(
    value1: boolean, value2: boolean, errorMessage = ''
): void {
    if (value1 !== value2)
        throw new Error(errorMessage);
}