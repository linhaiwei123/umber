cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        targetAngle: 0,
        delay: 5,
    },

    onEnable: function(){
        this.target.runAction(cc.rotateTo(this.delay,this.targetAngle));
    },

    onDisable: function(){
        this.target.stopAction();
    }

});
