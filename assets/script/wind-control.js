cc.Class({
    extends: cc.Component,

    properties: {
       windA: cc.v2(0,0),
    },


    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player'){
            let playerMoveControl = other.node.getComponent('player-move-control');
            playerMoveControl.a = cc.pAdd(playerMoveControl.a,this.windA);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'player'){
           let playerMoveControl = other.node.getComponent('player-move-control');
            playerMoveControl.a = cc.pSub(playerMoveControl.a,this.windA);
        }
    },


});
