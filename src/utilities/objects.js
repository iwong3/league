export function itemTree(item) {
    this.item = item,
    this.kid = null,
    this.sibling = null,
    this.setKid = function(item) {
        this.kid = item;
    },
    this.setSibling = function(item) {
        this.sibling = item;
    },
    this.getKid = function() {
        return this.kid;
    },
    this.getSibling = function() {
        return this.sibling;
    }
}