import * as debounce from "@modules/reactive-pixels-ui/utils/debounce"
// @ponicode
describe("debounce.debounce", () => {
    test("0", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, 50, { isImmediate: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, 50, { isImmediate: true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, 5, { isImmediate: true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, 35, { isImmediate: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, 5, { isImmediate: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            debounce.debounce(() => undefined, Infinity, { isImmediate: false })
        }
    
        expect(callFunction).not.toThrow()
    })
})
