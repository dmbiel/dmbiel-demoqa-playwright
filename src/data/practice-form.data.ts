import path from 'node:path';

export type Gender = 'Male' | 'Female' | 'Other';
export type Hobby = 'Sports' | 'Reading' | 'Music';

export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  mobile: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  subjects: string[];
  hobbies: Hobby[];
  currentAddress: string;
  state: string;
  city: string;
  picturePath: string;
}

export const practiceFormSubmission: PracticeFormData = {
  firstName: 'Daria',
  lastName: 'Bielawska',
  email: 'daria.bielawska@example.com',
  gender: 'Female',
  mobile: '5012345678',
  dateOfBirth: {
    day: '23',
    month: 'February',
    year: '1996',
  },
  subjects: ['English'],
  hobbies: ['Music'],
  currentAddress: 'Warsaw, Poland',
  state: 'NCR',
  city: 'Delhi',
  picturePath: path.resolve(
    process.cwd(),
    'tests',
    'fixtures',
    'upload',
    'avatar.txt',
  ),
};
