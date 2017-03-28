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
            if(!this._breaking){
                this._breaking = true;
                this.startBreak();
            }
        }
    },

    startBreak: function(){
        this.node.runAction(cc.sequence(
            cc.delayTime(this.delay),
            cc.scaleTo(1,0,0),
            cc.removeSelf(true)
        ));
    },

});
