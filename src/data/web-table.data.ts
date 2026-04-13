export interface WebTableRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  salary: number;
  department: string;
}

export const webTableRecord: WebTableRecord = {
  firstName: 'Maks',
  lastName: 'Nowak',
  email: 'maks.nowak@example.com',
  age: 29,
  salary: 4200,
  department: 'QA',
};

export const updatedWebTableRecord: WebTableRecord = {
  ...webTableRecord,
  salary: 5600,
  department: 'Automation QA',
};
