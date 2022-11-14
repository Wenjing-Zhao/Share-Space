const { validateSpaceTalkerExist } = require("../../handlers/userHandlers");

describe("validateSpaceTalkerExist", () => {
  test("when the array is empty", () => {
    const userData = { messages: [] };

    validateSpaceTalkerExist(userData, {}, {}, 1, 2);
    expect(userData.messages.length).toBe(1);
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
