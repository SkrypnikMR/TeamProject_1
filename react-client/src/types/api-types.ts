export interface ChangeableFields {
  age: string;
  exp: string;
  color: string;
  hobbies: string;
}

export interface Developer extends ChangeableFields {
  id: string;
  name: string;
  avatar: string;
}
