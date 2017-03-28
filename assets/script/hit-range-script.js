cc.Class({
    extends: cc.Component,

    properties: {
        _colliderArray: [], 
        player: cc.Node,
        //hitAngle: 22,
    },

    onLoad: function () {
        this.node.on('hit',this.onHit,this);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onHit: function(e){
        let vector = e.detail;
        for(let idx in this._colliderArray){
            let item  = this._colliderArray[idx];
            //if(this.checkShouldHit(item,vector)){
                item.emit('hit');
            //}
        }
    },

    // checkShouldHit: function(item,vector){
    //     let otherVector = this.player.convertToNodeSpaceAR(item.parent.convertToWorldSpaceAR(item.position));
    //     //console.log('otherVector',otherVector);
    //     //console.log('selfVector',vector);
    //     let angle = cc.pAngle(otherVector,vector) * 180 / Math.PI;
    //     //console.log(angle);
    //     if(angle < this.hitAngle){
    //         return true;
    //     }else{
    //         return false;
    //     }

    // },

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
