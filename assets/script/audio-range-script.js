cc.Class({
    extends: cc.Component,

    properties: {
        audio: cc.AudioSource
    },


    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //console.log(this.audio);
        
    },

    onCollisionStay: function(other,self){
        if(other.node.group == 'player'){
            let vector = this.node.convertToNodeSpaceAR(other.node.parent.convertToWorldSpaceAR(other.node.position));
            let otherDistance = vector.mag();
            let selfDistance = self.radius;
            let rate = cc.clamp01(otherDistance / selfDistance);
            let revertRate = 1 - rate;
            this.audio.volume = revertRate / 2;
        }
    }, 

    onCollisionExit: function(other,self){
        if(other.node.group == 'player'){
            this.audio.volume = 0;
        }
    },

});
