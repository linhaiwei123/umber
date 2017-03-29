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
        if(other.node.group == 'bullet'){
            for(let item of this.toggleArray){
                item.active = !item.active;
            }
            this.node.scaleY = -this.node.scaleY;
        }
    }


});