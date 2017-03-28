cc.Class({
    extends: cc.Component,

    properties: {
        hitMaxTime: 6,
        canDestroy: true,
    },


    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.on('hit',this.onHit,this);
    },

    onHit: function(){
        this.hitMaxTime -= 6;
        //hit anim or back move
        //may be the back move would be used in the wall and the broken wall.
        this.checkDestroy();
    },

    checkDestroy:function(){
        if(this.hitMaxTime <= 0 && this.canDestroy){
            this.node.removeFromParent(true);
        }
    },

    onBulletEnter: function(){
        this.hitMaxTime--;
        //bullet anim or back move
        this.checkDestroy();
    },

    onBulletExit: function(){
        //bullet exit anim color?

    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'bullet'){
            this.onBulletEnter();
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'bullet'){
            this.onBulletExit();
        }
    }

});
