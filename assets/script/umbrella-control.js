cc.Class({
    extends: cc.Component,

    properties: {
        _vector: null,
        panel: cc.Node,
        _state: null,

        umbrellaAnim: cc.Animation,
        umbrellaHandler: cc.Node,
        //umbrella: cc.Node,

        bulletPrefab: cc.Prefab,
        hitRange: cc.Node,
        _lockVector: null,

        player: cc.Node,

        _worldTargetPosition: null,
    },


    onLoad: function () {
        // this._umbrellaAnim = this.node.getChildByName('umbrella').getComponent(cc.Animation);
        // this._umbrella = this.node.getChildByName('umbrella');
        //this._hitRange = this._umbrella.getChildByName('hit-range');
        this.panel.on('mousemove',this.onMouseMove,this)

        this.node.on('open',this.onOpen,this);
        this.node.on('shoot',this.onShoot,this);
        this.node.on('hit',this.onHit,this);
        this.node.on('lock-vector',this.onLockVector,this);
        this.node.on('position-changed',this.onPositionChanged,this);

       this.umbrellaAnim.on('stop',this.onAnimStop,this);
       this.umbrellaAnim.on('finished',this.onAnimStop,this);
    },

    onPositionChanged: function(){
        this.updateVector();
    },

    onLockVector: function(e){
        this._lockVector = e.detail;
    },

    onAnimStop:function(){
        this._lockVector = null;
    },

    updateVector: function(){
        if(!this._worldPosition){return;}
        this._vector = this.node.convertToNodeSpaceAR(this._worldPosition);
        //console.log(this._vector);
        let angle = cc.pToAngle(this._vector) * 180 / Math.PI;
        //console.log(angle);
        this.umbrellaHandler.rotation = -angle;
    },


    onMouseMove: function(e){
        this._worldPosition = this._lockVector ? this._lockVector : e.getLocation();
        this.updateVector();
    },

    onOpen: function(){
        this._state = 'open';
        this._lockVector = null;
        this.umbrellaAnim.stop();
        this.umbrellaAnim.play('open');
    },

    onShoot: function(){
        this._state = 'shoot';
        this.umbrellaAnim.stop();
        this.umbrellaAnim.play('shoot');
        //shoot
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.position = this.node.position;
        bullet.parent = this.node.parent;
        bullet.getComponent('bullet-script').init(this._vector);
    },

    onHit: function(){
        this._state = 'hit';
        this.hitRange.emit('hit',this._vector);
        let hitAnimState = this.umbrellaAnim.play('hit');
    },

    

});
