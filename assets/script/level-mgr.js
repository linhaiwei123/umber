cc.Class({
    extends: cc.Component,

    properties: {
        level: 0,   
        _sceneLoading: false,
    },

    onLoad: function () {
        cc.systemEvent.on('keydown',this.onKeyDown,this);
        this.node.on('touch-gate',this.nextLevel,this);
        this.node.on('hp-zero',this.restart,this);
    },

    restart: function(){
          if(!this._sceneLoading){
                this._sceneLoading = true;
                cc.director.loadScene("level-" + this.level + "-scene");
          }
    },

    nextLevel: function(){
        if(!this._sceneLoading){
                this._sceneLoading = true;
                cc.director.loadScene("level-" + (this.level + 1) + "-scene");
            }
    },

    onKeyDown: function(e){
        if(e.keyCode == cc.KEY.r){
            if(!this._sceneLoading){
                this._sceneLoading = true;
                cc.director.loadScene("level-" + this.level + "-scene");
            }
        }
    },

});
