cc.Class({
    extends: cc.Component,

    properties: {
        maxDistance: 300,
    },

    init: function (vector) {
        let angle = cc.pToAngle(vector) * 180 / Math.PI;
        this.node.rotation = -angle;
        this.node.runAction(cc.sequence(
            cc.moveBy(3,cc.pMult(cc.pNormalize(vector),this.maxDistance)),
            cc.removeSelf(true)
        ));
    },

    

});
