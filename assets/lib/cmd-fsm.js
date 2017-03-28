let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"idling"},
{"name":"hit","from":"idling","to":"hiting"},
{"name":"hit","from":"shooting","to":"hiting"},
{"name":"hit","from":"opening","to":"hiting"},
{"name":"open","from":"shooting","to":"opening"},
{"name":"idle","from":"opening","to":"idling"},
{"name":"idle","from":"hiting","to":"idling"},
{"name":"idle","from":"shooting","to":"idling"},
{"name":"idle","from":"idling","to":"idling"},
{"name":"shoot","from":"hiting","to":"shooting"},
{"name":"shoot","from":"opening","to":"shooting"},
{"name":"shoot","from":"idling","to":"shooting"},
{"name":"open","from":"idling","to":"opening"},
{"name":"open","from":"hiting","to":"opening"},
{"name":"hit","from":"hiting","to":"hiting"},
{"name":"shoot","from":"shooting","to":"shooting"},
{"name":"open","from":"opening","to":"opening"}
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}