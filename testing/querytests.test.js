// make sure to run npm install in order to use the jest framework


const hourQuerySample = require('./querytestsimplified');

//A flight between midnight and 3 am (0/24)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T1:34:00';
    const expectedOutput = 0;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});

//A flight between 4 am and 8 am (4)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T5:58:00';
    const expectedOutput = 4;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});

//A flight between 8 am and 12 pm (8)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T10:17:00';
    const expectedOutput = 8;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});

//A flight between 12 pm and 4 pm (12)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T14:46:00';
    const expectedOutput = 12;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});

//A flight between 4 pm and 8 pm (16)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T17:46:00';
    const expectedOutput = 16;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});

//A flight between 8 pm and 12 am (20)
describe('hourQuerySample', () => {
  test('returns the correct hour', async () => {
    const inputTime = '2023-04-24T22:49:00';
    const expectedOutput = 20;
    expect(hourQuerySample(inputTime)).toEqual(expectedOutput);
  });
});