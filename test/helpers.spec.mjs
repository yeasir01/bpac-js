import { expect } from "chai";
import { getAbsolutePath } from "../dist/helpers.mjs";

describe("Helpers", () => {
    describe("getAbsolutePath()", () => {
        it("To be a function", () => {
            expect(getAbsolutePath).to.be.a("function");
        });

        it("To throw an error when no args passed.", () => {
            expect(() => getAbsolutePath()).to.throw(Error);
        });

        it("To combine path and filename using backslashes.", () => {
            const result = getAbsolutePath("C:\\", "label.lbx")
            expect(result).to.have.string("C:\\label.lbx");
        });

        it("To combine path and filename using forward slashes", () => {
            const result = getAbsolutePath("/user/name/", "label.lbx")
            expect(result).to.have.string("/user/name/label.lbx");
        });
    });
});
