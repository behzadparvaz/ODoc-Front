// TODO: fisrtname must be changed to firstName for familyMembers
export interface Person {
  firstName?: string
  fisrtname?: string
  lastName: string
  nationalCode: string
}

export interface Profile extends Person{
  createBy: string
  createDateTime: string
  familyMembers: Array<Person>
  id: string
  modifiedBy: string
  modifiedDateTime: string
  phoneNumber: string
}
