cc.Class({
    extends: cc.Component,

    properties: {
       audio: cc.AudioSource,
       toggleAble: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.node.on('hit',this.onHit,this);
        console.log(this.audio.isPlaying);
        if(!this.audio.isPlaying){
            this.audio.volume = 0;
            this.audio.play();
        }
    },

    toggleAudio: function(){
        if(!this.toggleAble){return;}
        if(this.audio.isPlaying){
            this.audio.pause();
        }else{
            this.audio.resume();
        }
    },

    onHit: function(){
        this.toggleAudio();
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'bullet'){
            this.toggleAudio();
        }
    }

});
