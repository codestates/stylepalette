// 아이디: 영어 또는 숫자만 가능
export function validId(str: string) {
  return /^[A-Za-z][A-Za-z0-9]{4,15}$/.test(str);
}

// 비밀번호: 최소 8자 이상 15자이면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
export function validPassword(str: string) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(str);
}

//이메일:
export function validEmail(str: string) {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    str,
  );
}
