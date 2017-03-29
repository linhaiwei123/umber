cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        speed: 5,
    },

    onLoad: function () {

    },

    update: function(){
        let vector = cc.pMult(cc.pNormalize(cc.pSub(this.player.position,this.node.position)),this.speed);
        this.node.position = cc.pAdd(this.node.position,vector);
    },

});
