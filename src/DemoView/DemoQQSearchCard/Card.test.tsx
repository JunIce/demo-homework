import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Card } from "./Card";

beforeAll(() => {});
afterAll(() => {});

function setup() {
  let container = document.createElement("div");

  let utils = render(<Card />, {
    container,
  });

  let input = utils.getByRole("textbox");

  return {
    ...utils,
    input,
  };
}

describe("Card", () => {
  test("card input error validate", () => {
    let { container, input } = setup();

    expect((input as HTMLInputElement).value).toBe("");

    // eslint-disable-next-line
    let inputWrapper = container.getElementsByClassName("card-input-box")[0];
    const ERROR_CLASS = "card-input-box_error";

    expect(inputWrapper).not.toHaveClass(ERROR_CLASS);

    fireEvent.change(input, {
      target: {
        value: "123",
      },
    });

    expect(inputWrapper).toHaveClass(ERROR_CLASS);

    fireEvent.change(input, {
      target: {
        value: "12345",
      },
    });

    expect(inputWrapper).not.toHaveClass(ERROR_CLASS);
  });

  test("card input would remove non-numeric char", () => {
    let { input } = setup();

    expect((input as HTMLInputElement).value).toBe("");

    fireEvent.change(input, {
      target: {
        value: "abc123",
      },
    });

    expect((input as HTMLInputElement).value).toEqual("123");
  });

  test("card input max length 11 char", () => {
    let { container, input } = setup();

    expect((input as HTMLInputElement).value).toBe("");

    // eslint-disable-next-line
    let inputWrapper = container.getElementsByClassName("card-input-box")[0];
    const ERROR_CLASS = "card-input-box_error";

    fireEvent.change(input, {
      target: {
        value: "7917736789821",
      },
    });

    expect((input as HTMLInputElement).value).toEqual("79177367898");
    expect(inputWrapper).not.toHaveClass(ERROR_CLASS);
  });

  test("card input would send request after 800ms", async () => {
    let { container, input } = setup();

    expect((input as HTMLInputElement).value).toBe("");

    // eslint-disable-next-line
    let resultItem = container.getElementsByClassName("card-item");

    fireEvent.change(input, {
      target: {
        value: "791773678",
      },
    });

    expect((input as HTMLInputElement).value).toBe("791773678");
    
    await waitFor(() => {
      expect(resultItem.length).toBe(0)
    }, {
      timeout: 800
    })

    await waitFor(() => {
      expect(resultItem.length).toBe(1)
    }, {
      timeout: 2000
    })
  });

  test("card with errro response", async() => {
    let { container, input } = setup();

    expect((input as HTMLInputElement).value).toBe("");

    // eslint-disable-next-line
    let errorResponse = container.getElementsByClassName("error-tip");

    fireEvent.change(input, {
      target: {
        value: "12873827388",
      },
    });

    expect((input as HTMLInputElement).value).toBe("12873827388"); 
    expect(errorResponse.length).toBe(0);
    
    await waitFor(() => {
      expect(errorResponse.length).toBe(1)
    }, {
      timeout: 2000
    });
  });
});
