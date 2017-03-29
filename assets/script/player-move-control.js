cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        _leftRelease: false,
        _rightRelease: false,

        stepX: 5,
        stepY: 5,
        //maxSpeed: 50,
        _outerSpeed: cc.v2(),

        a: cc.v2(0,-10),
        _speed: cc.v2(0,0),
        _jumping: false,

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,

        _space: false,

        _open: false,
        _umbrellaControl: {
            get: function(){
                return this.getComponent('umbrella-control');
            }
        },
        drag: 0.3,
    },


    onLoad: function () {
        this.node.on('open',this.onOpen,this);
        this.node.on('leave-open',this.onLeaveOpen,this);

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);
    },

    onOpen: function(){
        this._open = true;
    },

    onLeaveOpen: function(){
        this._open = false;
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.w: if(this._jumping == false){this._up = true;this._jumping = true;}break;
            case cc.KEY.s: this._down = true;break;
            case cc.KEY.a: this._left = true;break;
            case cc.KEY.d: this._right = true;break;
            case cc.KEY.space: this._space = true;break;
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            //case cc.KEY.w: this._up = false;break;
            case cc.KEY.s: this._down = false;break;
            case cc.KEY.a: this._left = false;this._leftRelease = true;break;
            case cc.KEY.d: this._right = false;this._rightRelease = true;break;
            case cc.KEY.space: this._space = false;break;
        }
    },

    shouldHandleCollsion: function(other){
        if(other.node.group == 'wall' || other.node.group == 'broken-wall'){
            return true;
        }
        return false;
    },

    onCollisionEnter: function(other,self){

        if(!this.shouldHandleCollsion(other)){
            return;
        }
        let selfAabb = self.world.aabb;
        let otherAabb = other.world.aabb;
        let selfPreAabb = self.world.preAabb;
        let otherPreAabb = other.world.preAabb;

        let localBlockArray = [];
        
        if(selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            this._rightBlock++;
            let edgePositionX = self.node.x - Math.abs(selfAabb.xMax - otherAabb.xMin);
            this.node.x = edgePositionX;
            localBlockArray.push({
                direction: '_rightBlock',
                edgePositionX: edgePositionX,
            });
        }
        if(selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            //left block
            this._leftBlock++;
            let edgePositionX = self.node.x + Math.abs(selfAabb.xMin - otherAabb.xMax);
            this.node.x = edgePositionX;
            localBlockArray.push({
                direction: '_leftBlock',
                edgePositionX: edgePositionX
            });
        }
        if(selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up block
            this._upBlock++;
            let edgePositionY = self.node.y  - Math.abs(selfAabb.yMax - otherAabb.yMin);
            this.node.y = edgePositionY;
            localBlockArray.push({
                direction: '_upBlock',
                edgePositionY: edgePositionY
            });
        }
        if(selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down block
            
            this._downBlock++;
            let edgePositionY = self.node.y + Math.abs(selfAabb.yMin - otherAabb.yMax);
            this.node.y = edgePositionY;
            localBlockArray.push({
                direction: '_downBlock',
                edgePositionY: edgePositionY
            });
            //to check whether other is the move platform
            //if it have outerspeed
            //move together
            //this._outerSpeed = cc.pAdd(this._outerSpeed,cc.v2(30,0));
        }

        if(other.blockArray == undefined){
            other.blockArray = [];
        }
        other.blockArray[self.uuid] = localBlockArray;
    },

    onCollisionExit: function(other,self){

        if(!this.shouldHandleCollsion(other)){
            return;
        }
        if(other.blockArray != undefined){
            let localBlockArray = other.blockArray[self.uuid];
            for(let item of localBlockArray){
                this[item.direction]--;
                //to check whether other is the move platform
                //if it have outerspeed
                //divide
                //this._outerSpeed = cc.pSub(this._outerSpeed,cc.v2(30,0));
            }
        }
    },

    lateUpdate: function(dt){
        //console.log(this._jumping);
       //move pass
       if(this._left && !this._leftBlock){
           if(this._speed.x > -this.stepX){
            this._speed.x = -this.stepX;
           }
       }
       if(this._leftRelease && this._speed.x < 0 && this._speed.x >= -this.stepX){
           this._leftRelease = false;
           this._speed.x = 0;
       }
       if(this._right && !this._rightBlock){
           if(this._speed.x < this.stepX){
            this._speed.x = this.stepX;
           }
       }
       if(this._rightRelease && this._speed.x > 0 && this._speed.x <= this.stepX){
           this._rightRelease = false;
           this._speed.x = 0;
       }
       if(this._up){
            this._jumping = true;
            this._up = false;
            this._speed.y += this.stepY;
       }
       else if(this._downBlock || (this._space && (this._leftBlock || this._rightBlock))){
           this._jumping = false;
           this._speed.y = 0;
       }
       //做万向的重力先
       this._speed = cc.pAdd(this._speed,cc.pMult(this.a,dt));
       if(this._leftBlock && this._speed.x < 0){this._speed.x = 0;}
       if(this._rightBlock && this._speed.x > 0){this._speed.x = 0;}
       if(this._upBlock && this._speed.y > 0){this._speed.y = 0;}
       if(this._downBlock && this._speed.y < 0){this._speed.y = 0;}
       
       let speedWithAirDrag = this._speed;
       if(this._open){
            let vector = this._umbrellaControl._vector;
            if(vector){
                //伪浮力 : 速度方向 点乘 开伞方向 得到比例 再开放接口修改浮力阻力系数;
                let rate = cc.pDot(cc.pNormalize(this._speed),cc.pNormalize(vector));
                speedWithAirDrag = cc.pMult(this._speed,(1 + rate * this.drag));
            }
       }

       //this._speed = cc.pClamp(this._speed,cc.v2(-this.maxSpeed,-this.maxSpeed),cc.v2(this.maxSpeed,this.maxSpeed))

       //let diff = cc.pMult(this._speed,dt);
       //[add] add air drag 
       let diff = cc.pMult(speedWithAirDrag,dt);
       this.node.position = cc.pAdd(this.node.position,diff);
       //[fix] fix the offset of camera by use the positive position
       //this.node.parent.position =cc.pAdd(this.node.parent.position,cc.pNeg(diff));
       //[add] add the drag to the camera
       //[delete] delete the drag to the camera
       this.node.parent.position = cc.pNeg(this.node.position);
       //this.node.parent.stopAction();
       //this.node.parent.runAction(cc.moveTo(1,cc.pNeg(this.node.position)));

    }
});