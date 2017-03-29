cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player'){
            cc.find('Canvas').emit('touch-gate');
        }
    }

});
