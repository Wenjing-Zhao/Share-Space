const { validateSpaceTalkerExist } = require("../../handlers/userHandlers");

describe("validateSpaceTalkerExist", () => {
  test("when the array is empty", () => {
    const userData = { messages: [] };

    validateSpaceTalkerExist(userData, {}, {}, 1, 2);
    expect(userData.messages.length).toBe(2);
  });

  test("when results is false ", () => {
    const userData = { messages: [{ spaceId: 2, talkerId: 1 }] };

    validateSpaceTalkerExist(userData, {}, {}, 1, 2);
    expect(userData.messages.length).toBe(2);
  });

  test("when result is true", () => {
    const userData = {
      messages: [{ spaceId: 1, talkerId: 2, messagesLog: [] }],
    };

    validateSpaceTalkerExist(userData, {}, {}, 1, 2);
    expect(userData.messages[0].messagesLog.length).toBe(1);
  });
});

// toBeDefined
// toBeGreaterThan / toBeLessThan
// toBe (uses === to compare)
// toEqual (for deep object comparison)
// toContain (see if a value is inside of a collection)

// test("arithmetic", function() {
//   expect(4 + 4).toBeGreaterThan(7);
//   expect(4 + 4).toBeLessThan(9);
// });

// test("references", function() {
//   var arr = [1, 2, 3];
//   expect(arr).toEqual([1, 2, 3]);
//   expect(arr).not.toBe([1, 2, 3]);
//   expect(arr).toContain(1);
// });
