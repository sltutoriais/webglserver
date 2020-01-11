var socket = io() || {};
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		gameInstance.SendMessage("NetworkController", method, args.join(','));
	};


					      
	socket.on('LOGIN_SUCCESS', function(id,name,position,rotation) {
				      		
	  var currentUserAtr = id+','+name+','+position+','+rotation;
	  gameInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
	});
	
		
	socket.on('SPAWN_PLAYER', function(id,name,position,rotation) {
	    var currentUserAtr = id+','+name+','+position+','+rotation;
		gameInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		
	});
	
	socket.on('RESPAW_PLAYER', function(id,name,position,rotation) {
	    var currentUserAtr = id+','+name+','+position+','+rotation;
		gameInstance.SendMessage ('NetworkManager', 'OnRespawPlayer', currentUserAtr);
		
	});
	
    socket.on('UPDATE_MOVE_AND_ROTATE', function(id,position,rotation) {
	     var currentUserAtr = id+','+position+','+rotation;
		gameInstance.SendMessage ('NetworkManager', 'OnUpdateMoveAndRotate',currentUserAtr);
		//execInUnity('Update_messages', currentUser);
	});
	
	
	 socket.on('UPDATE_PLAYER_ANIMATOR', function(id,animation) {
	     var currentUserAtr = id+','+animation;
		gameInstance.SendMessage ('NetworkManager', 'OnUpdateAnim',currentUserAtr);
		//execInUnity('Update_messages', currentUser);
	});

	socket.on('UPDATE_ATACK', function(targetId) {
	    var currentUserAtr = targetId;
		gameInstance.SendMessage ('NetworkManager', 'OnUpdateAtack',currentUserAtr);
		//execInUnity('Update_messages', currentUser);
	});
	
	
	socket.on('DEATH', function(targetId) {
	    var currentUserAtr = targetId;
		gameInstance.SendMessage ('NetworkManager', 'OnPlayerDeath',currentUserAtr);
		//execInUnity('Update_messages', currentUser);
	});
	
    socket.on('UPDATE_PHISICS_DAMAGE', function(shooterId,targetId,targetHealth) {
	     var currentUserAtr = shooterId+','+targetId+','+targetHealth;
		gameInstance.SendMessage ('NetworkManager', 'OnUpdatePlayerPhisicsDamage',currentUserAtr);
		//execInUnity('Update_messages', currentUser);
	});		
	
	
		        
	socket.on('USER_DISCONNECTED', function(id) {
	     var currentUserAtr = id;
	     gameInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		//execInUnity('User_disconected', score);
	});
	

});

