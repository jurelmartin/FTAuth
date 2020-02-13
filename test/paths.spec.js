const {paths} = require('../index');
const {expect} = require('chai');

describe("FTAuth :: Paths :: checkPath()", function() {
    context("when path is on the list", () => {
        it("return path data", () => {
            paths.setPath([
                {role: 'User', url: "url.com"}
            ]);
            const path = paths.checkPath('url.com');
    
            expect(path.url).to.equal('url.com')
        });
    })
    context("when path is not on the list", () => {
        it("return false", () => {
            paths.setPath([
                {role: 'User', url: "url.com"}
            ]);
            const path = paths.checkPath('urls.com');
    
            expect(path).to.equal(false)
        });
    })
});