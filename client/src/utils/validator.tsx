// [유효성 검증 함수]: 영어 또는 숫자만 가능
export function onlyNumberAndEnglish(str: string) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

// [유효성 검증 함수]: 최소 8자 이상이면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
export function strongPassword(str: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
