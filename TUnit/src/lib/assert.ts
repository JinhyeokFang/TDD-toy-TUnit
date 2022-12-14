export function assertEqualBoolean(
    value1: boolean, value2: boolean, errorMessage = ''
): void {
    if (value1 !== value2)
        throw new Error(errorMessage);
}

export function assertEqualString(
    string1: string, string2: string, errorMessage = ''
): void {
    assertEqualBoolean(string1 === string2, true, errorMessage);
}

export function assertEqualNumber(
    number1: number, number2: number, errorMessage = ''
): void {
    assertEqualBoolean(number1 === number2, true, errorMessage);
}
