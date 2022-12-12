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
