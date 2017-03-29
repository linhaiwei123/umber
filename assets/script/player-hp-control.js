cc.Class({
    extends: cc.Component,

    properties: {
        _hp: 100,
        hp: {
            get: function(){
                return this._hp;
            },
            set: function(value){
                this._hp = value;
                this.getComponent(cc.Label).string = value < 0 ? 0 : value;
            } 
        },
    },

    onLoad: function () {
        cc.find('Canvas').on('player-hp-up',this.onPlayerHpUp,this);
        cc.find('Canvas').on('player-hp-down',this.onPlayerHpDown,this);
        this.hp = this._hp;
    },

    onPlayerHpUp: function(e){
        this.hp += e.detail;
        //this.checkDead();
    },

    onPlayerHpDown: function(e){
        this.hp -= e.detail;
        this.checkDead();
    },

    checkDead: function(){
        if(this.hp <= 0){
            //game over
            cc.find('Canvas').emit('game-over');
            //console.log('game-over');
        }
    },

});
