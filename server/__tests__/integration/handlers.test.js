const axios = require("axios");

describe("Spaces endpoints", () => {
  test("Get spaces - Should respond with an array", async () => {
    const response = await axios.get("http://localhost:8000/api/get-spaces");
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.status).toBe(200);
  });
});

describe("test endpoints", () => {
  test("create/get user + add/get/update/delete space", async () => {
    let newUserId = null;
    let newSpaceId = null;

    // create new user test or login exsited user
    const responseAddUser = await axios.post(
      "http://localhost:8000/api/add-user",
      {
        firstName: "TestFirstName",
        lastName: "TestLastName",
        avatarUrl: "https://testavatar.com",
        email: "testuser@mail.com",
      }
    );

    expect([200, 201]).toContain(responseAddUser.data.status);
    newUserId = responseAddUser.data.data.userId;

    // get the user test
    const responseGetUser = await axios.get(
      `http://localhost:8000/api/get-user/${newUserId}`
    );

    expect(responseGetUser.status).toBe(200);

    // add space test
    const responseAddSpace = await axios.post(
      "http://localhost:8000/api/add-space",
      {
        spaceDetails: {
          imageSrc: "https://testimage.com",
          availableDate: ["testDate", "testDate"],
          needs: ["testNeed"],
          addressDetails: {
            address: "testAdress",
            city: "testCity",
            region: "testRegion",
            country: "testCountry",
            postal: "testPostal",
          },
        },
        host: newUserId,
      }
    );

    expect(responseAddSpace.data.status).toBe(201);
    newSpaceId = responseAddSpace.data.data.spaceId;

    // get space
    const responseGetSpace = await axios.get(
      `http://localhost:8000/api/get-space/${newSpaceId}`
    );
    expect(responseGetSpace.data.status).toBe(200);

    // update space
    const responsePatchSpace = await axios.patch(
      `http://localhost:8000/api/update-space/${newSpaceId}`,
      {
        imageSrc: "https://updatedtestimage.com",
        availableDate: ["updatedTestDate", "updatedTestDate"],
        needs: ["updatedTestNeed"],
      }
    );

    expect(responsePatchSpace.data.status).toBe(200);

    // delete space
    const responseDeleteSpace = await axios.delete(
      `http://localhost:8000/api/delete-space/${newSpaceId}`
    );
    expect(responseDeleteSpace.data.status).toBe(200);

    // check space
    try {
      const responseCheckSpace = await axios.get(
        `http://localhost:8000/api/get-space/${newSpaceId}`
      );
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
