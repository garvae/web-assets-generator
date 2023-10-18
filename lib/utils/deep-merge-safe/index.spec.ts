import { deepMergeSafe } from './index';


describe('deepMergeSafe', () => {

  /**
   * Tests that two objects with the same type fields are merged correctly
   */
  it('should merge two objects with the same type fields correctly', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj = {
      age: 40,
      name: 'Doe',
    };
    const result = deepMergeSafe({
      attachable: [ attachableObj ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 40,
      name: 'Doe',
    });
  });

  /**
   * Tests that multiple objects with the same type fields are merged correctly
   */
  it('should merge multiple objects with the same type fields correctly', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj1 = { name: 'Doe' };
    const attachableObj2 = { age: 40 };
    const result = deepMergeSafe({
      attachable: [ attachableObj1, attachableObj2 ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 40,
      name: 'Doe',
    });
  });

  /**
   * Tests that empty objects are merged correctly
   */
  it('should merge empty objects correctly', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj = {};
    const result = deepMergeSafe({
      attachable: [ attachableObj ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 30,
      name: 'John',
    });
  });

  /**
   * Tests that objects with different type fields are not merged
   */
  it('should not merge objects with different type fields', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj = { age: '40' };
    const result = deepMergeSafe({
      attachable: [ attachableObj ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 30,
      name: 'John',
    });
  });

  /**
   * Tests that objects with null values are merged correctly
   */
  it('should merge objects with null values correctly', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj = { name: null };
    const result = deepMergeSafe({
      attachable: [ attachableObj ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 30,
      name: originalObj.name,
    });
  });

  /**
   * Tests that objects with undefined values are merged correctly
   */
  it('should merge objects with undefined values correctly', () => {
    expect.assertions(1);
    const originalObj = {
      age: 30,
      name: 'John',
    };
    const attachableObj = { name: undefined };
    const result = deepMergeSafe({
      attachable: [ attachableObj ],
      original: originalObj,
    });
    expect(result).toStrictEqual({
      age: 30,
      name: 'John',
    });
  });
});
