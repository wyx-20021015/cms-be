type Sex = 'male' | 'female'
type User = {
  avatar: string,
  name: string,
  major: string,
  grade: string,
  sex: Sex,
  phone: string,
  email: string,
  id_?: string
}
export default User