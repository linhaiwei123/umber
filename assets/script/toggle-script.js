cc.Class({
    extends: cc.Component,

    properties: {
        toggleArray: [cc.Node]
    },


    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //this.node.name = 'toggle#' + Date.now();
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'bullet' || other.node.group == 'hit-range'){
            for(let item of this.toggleArray){
                item.active = !item.active;
            }
            this.node.scaleY = -this.node.scaleY;
        }
    }


});