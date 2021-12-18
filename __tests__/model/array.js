import { jest } from "@jest/globals";
import model from "../../src/model.js";

describe("Array", () => {
  test("It should return the array length", async () => {
    const callback = jest.fn();

    const data = model([], callback);

    expect(data.length).toBe(0);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("It should get items at specified indexes", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const first = data[0];
    const last = data[data.length - 1];
    const none = data[3];

    expect(callback.mock.calls.length).toBe(0);
    expect(data.length).toBe(2);
    expect(first).toBe("eggs");
    expect(last).toBe("milk");
    expect(none).toBe(undefined);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("It should iterate all items", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const copy = [];
    data.forEach((item) => {
      copy.push(item);
    });

    expect(data.length).toBe(2);
    expect(copy.length).toBe(2);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test("It should add an item at the end", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const index = data.push("cereal");

    expect(callback.mock.calls[0][0]).toBe("2");
    expect(callback.mock.calls[1][0]).toBe("length");
    expect(data.length).toBe(3);
    expect(index).toBe(3);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("It should remove the last item", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const item = data.pop("cereal");

    expect(callback.mock.calls[0][0]).toBe("length");
    expect(data.length).toBe(1);
    expect(item).toBe("milk");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("It should remove the first item", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const item = data.shift("cereal");

    expect(callback.mock.calls[0][0]).toBe("0");
    expect(callback.mock.calls[1][0]).toBe("length");
    expect(data.length).toBe(1);
    expect(item).toBe("eggs");
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("It should add an item at the start", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const length = data.unshift("cereal");

    expect(callback.mock.calls[0][0]).toBe("2");
    expect(callback.mock.calls[1][0]).toBe("1");
    expect(callback.mock.calls[2][0]).toBe("0");
    expect(callback.mock.calls[3][0]).toBe("length");
    expect(data.length).toBe(3);
    expect(length).toBe(3);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  test("It should find an item index", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const milk = data.indexOf("milk");
    const none = data.indexOf("tea");

    expect(milk).toBe(1);
    expect(none).toBe(-1);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback.mock.calls.length).toBe(0);
  });

  test("It should remove an item by its index", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const removedMilk = data.splice(1, 1);
    const none = data.splice(1, 1);

    expect(data).toStrictEqual(["eggs"]);
    expect(removedMilk).toStrictEqual(["milk"]);
    expect(none).toStrictEqual([]);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.calls[0][0]).toBe("length");
    expect(callback.mock.calls[1][0]).toBe("length");
  });

  test("It should copy the array", async () => {
    const callback = jest.fn();

    const data = model(["eggs", "milk"], callback);

    const copy = data.slice();

    expect(copy).toStrictEqual(data);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback.mock.calls.length).toBe(0);
  });
});
