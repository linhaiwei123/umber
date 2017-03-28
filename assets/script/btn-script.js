cc.Class({
    extends: cc.Component,

   properties: {
        btnArray: [cc.Node],
        _initActive: [],
        _touchNum: 0
    },


    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //this.node.name = 'btn#' + Date.now();
    },

    start: function(){
        for(let item of this.btnArray){
            this._initActive[item.uuid] = item.active;
        }
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'bullet' || other.node.group == 'hit-range'){
            this._touchNum++;
            this.node.color = cc.Color.GREEN;
            for(let item of this.btnArray){
                item.active = !this._initActive[item.uuid];
            }
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'bullet' || other.node.group == 'hit-range'){
            this._touchNum--;
            if(!this._touchNum){
                for(let item of this.btnArray){
                    item.active = this._initActive[item.uuid];
                }
                this.node.color = cc.Color.RED;
            }
            
        }
    },

    
});