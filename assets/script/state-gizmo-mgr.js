cc.Class({
    extends: cc.Component,

    properties: {
        panel: cc.Node,
        stateGizmoPrefab: cc.Prefab,
        _stateGizmo: null,
        _fsm: null,
        _startPosition: null,
        _selecting: false,
        _state: null,
        player: cc.Node,
    },


    onLoad: function () {
        this._stateGizmo = cc.instantiate(this.stateGizmoPrefab);
        this._fsm = require('cmd-fsm').create();
        this._fsm.onhit =  function(){
            this.player.emit('hit');
        }.bind(this);
        this._fsm.onshoot =  function(){
            this.player.emit('shoot');
        }.bind(this);
        this._fsm.onopen =  function(){
            this.player.emit('open');
        }.bind(this);
        this._fsm.onleaveopening = function(){
            this.player.emit('leave-open');
        }.bind(this);
    },

    start: function(){
        this._fsm.startup();
        this.panel.on('mousedown',this.onMouseDown,this);
        this.panel.on('mousemove',this.onMouseMove,this);
        this.panel.on('mouseup',this.onMouseUp,this);
    },

    onMouseDown: function(e){
        if(e.getButton() == 2){
            this._selecting = true;
            this.player.emit('lock-vector',e.getLocation());
            this._startPosition = e.getLocation();
            //let stateGizmo = cc.instantiate(this.stateGizmoPrefab);
            this._stateGizmo.parent = this.panel;
            this._stateGizmo.position = this.panel.convertToNodeSpaceAR(e.getLocation());
        }
    },

    updateOpacity: function(){
        this._stateGizmo.getChildByName('hit-mask').opacity = this._state == 'hit'? 255:130;
        this._stateGizmo.getChildByName('open-mask').opacity = this._state == 'open'? 255:130;
        this._stateGizmo.getChildByName('shoot-mask').opacity = this._state == 'shoot'? 255:130;
    },

    onMouseMove: function(e){
        if(this._selecting){
            let angle = cc.pToAngle(cc.pSub(e.getLocation(),this._startPosition)) * 180 / Math.PI;
            //console.log(angle);
            if(angle >= 0 && angle < 120){
                //hit
                this._state = 'hit';
                //console.log(this._state);
            }if(angle < 0 && angle > -120){
                //shoot
                this._state = 'shoot';
                //console.log(this._state);
            }if(angle >= 120 && angle <= 180 || angle <= -120 && angle >= -180){
                //open
                this._state = 'open';
                //console.log(this._state);
            }
            
            this.updateOpacity();
        }
    },

    fadeOutItem: function(){
        let item = this._stateGizmo.getChildByName(this._state + '-mask');
        let copyItem = cc.instantiate(item);
        copyItem.parent = this.panel;
        copyItem.position = this.panel.convertToNodeSpaceAR(item.parent.convertToWorldSpaceAR(item.position));
        copyItem.runAction(cc.sequence(
            cc.fadeOut(0.3),
            cc.removeSelf(true)
        ));
    },

    onMouseUp: function(e){
        if(e.getButton() == 2){
            if(this._state && this._fsm.can(this._state)){
                this._fsm[this._state]();
                this.fadeOutItem();
            }
            //console.log(this._fsm.current);
            this._selecting = false;
            this._stateGizmo.position = cc.v2(100000,100000);
        }
    }


});
