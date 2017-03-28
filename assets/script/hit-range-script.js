cc.Class({
    extends: cc.Component,

    properties: {
        _colliderArray: [], 
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'danger'){
            this._colliderArray[other.node.uuid] = other.node;
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'danger'){
            delete this._colliderArray[other.node.uuid];
        }
    },

});
