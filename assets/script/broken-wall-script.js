cc.Class({
    extends: cc.Component,

    properties: {
        _breaking: false,
        delay: 5,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player'){
            this.scheduleOnce(this.startBreak,this.delay);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'player'){
            this.unschedule(this.startBreak,this.delay);
        }
    },

    startBreak: function(){
        // this.node.runAction(cc.sequence(
        //     cc.delayTime(this.delay),
        //     cc.scaleTo(1,0,0),
        //     cc.removeSelf(true)
        // ));
        this.node.removeFromParent();
    },

    // wallDestroy: function(){

    // },

});
