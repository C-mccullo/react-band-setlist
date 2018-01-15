import Firebase from 'firebase';

const config = {
	apiKey: "AIzaSyC_GumoLPgIALUv3ciIzidOYmvVl_H2zC4",
	authDomain: "set-list-app.firebaseapp.com",
	databaseURL: "https://set-list-app.firebaseio.com",
	projectId: "set-list-app",
	storageBucket: "set-list-app.appspot.com",
	messagingSenderId: "999433155297"
};

Firebase.initializeApp(config);

export const Provider = new Firebase.auth.GoogleAuthProvider();
export const Auth = Firebase.auth();
export default Firebase;

const Database = Firebase.database();

// Login
export const fetchUser = (user) => {
	Auth.onAuthStateChanged((user, err) => {
		if (user) {
			return user
		} else {
			return err
		}
	});
}
// allSetLists
export const fetchSetLists = () => {
	const setListsRef = Firebase.database().ref("setLists");
	return setListsRef.once('value')
}

export const deleteSetList = (setList) => {
	const allSetListsRef = Firebase.database().ref("setLists");
	const setListRef = Firebase.database().ref("setLists").child(setList);
	return setListRef.remove().then(() => {
		return allSetListsRef.once("value")
	});
}

export const addTimeStampToSetList = (setList) => {
	const timeStamp = (new Date()).getTime().toString()
	const allSetListsRef = Firebase.database().ref("setLists");
	const setListRef = Firebase.database().ref("setLists").child(setList)
	return setListRef.update({ timeStamp: timeStamp, used: true }).then(() => {
		return allSetListsRef.once("value")
	})
}
// newSetListForm
export const fetchNewSetList = () => {
	const newSongListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	return newSongListRef.once("value")
}

export const resetNewList = () => {
	const newSetListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	const resetNewSetList = {
		newSong: "",
		songList: {},
		used: false,
		timeStamp: ""
	}
	return newSongListRef.update(resetNewSetList).then(() => {
		return newSetListRef.once("value")
	});
}

export const updateNewSong = (song) => {
	console.log("updated Song", song)
	const newSetListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	const newSongRef = newSetListRef.child("newSong");
	return newSongRef.set(song).then(() => {
		return newSetListRef.once("value")
	})
}

// 👇 not completely required: can use updateNewSong with empty string argument
// export const resetNewSong = () => {
// 	const newSetListRef = Firebase.database().ref("newSetList").child("newSetList");
// 	const newSongRef = newSongListRef.child("newSong");
// 	return newSongRef.set(song).then(() => {
// 		return newSetListRef.once("value")
// 	})
// }

export const removeSongFromNewList = (song) => {
	const newSetListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	const songListRef = newListRef.child("songList");
	console.log(song);
	return songListRef.child(song).remove().then(() => {
		return newSetListRef.once("value")
	});
}

export const pushNewSongToSongList = () => {
	const newSetListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	const newSongRef = newSetListRef.child("newSong");
	const songListRef = newSetListRef.child("songList");
	return newSongRef.once("value").then(snapshot => {
		const value = snapshot.val();
		return songListRef.push(value).then(() => {
			return newSetListRef.once("value")
		})
	})
}

export const pushNewListToSetLists = () => {
	const setListsRef = Firebase.database().ref("setLists");
	const newSetListRef = Firebase.database().ref("newSetListForm").child("newSetList");
	return newSetListRef.once("value").then((snap) => {
		const setList = snap.val();
		return setListsRef.push(setList)
	})
}

// new setList Count
export const fetchNewListCount = () => {
	const countRef = Firebase.database().ref("newSetListForm").child("newPostCount");
	return countRef.once("value");
}

export const incrementNewListCount = () => {
	const countRef = Firebase.database().ref("newSetListForm").child("newPostCount");
	return countRef.transaction((count) => {
		return (count || 0) + 1;
	})
}

export const resetNewListCount = () => {
	const resetCount = 0;
	const countRef = Firebase.database().ref("newSetListForm").child("newPostCount");
	return countRef.set(resetCount);
}