// import firebase, { database } from '../../firebase';
// import { auth } from 'firebase';

// export const actionUsername = () => (dispatch) => {
//     setTimeout(() => {
//         return dispatch({ type: 'CHANGE_USER', value: 'Ahmad Santoso' })
//     }, 2000)
// }

// export const registerUserAPI = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//         dispatch({ type: 'CHANGE_LOADING', value: true })
//         firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
//             .then(res => {
//                 console.log('success: ', res);
//                 dispatch({ type: 'CHANGE_LOADING', value: false })
//                 resolve(true)
//             })
//             .catch(function (error) {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 alert(errorMessage)
//                 dispatch({ type: 'CHANGE_LOADING', value: false })
//                 reject(false)
//             })
//     })
// }

// export const loginUserAPI = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//         dispatch({ type: 'CHANGE_LOADING', value: true })
//         firebase.auth().signInWithEmailAndPassword(data.email, data.password)
//             .then(res => {
//                 console.log('success: ', res);
//                 const dataUser = {
//                     email: res.user.email,
//                     uid: res.user.uid,
//                     emailVerified: res.user.emailVerified,
//                     refreshToken: res.user.refreshToken
//                 }
//                 dispatch({ type: 'CHANGE_LOADING', value: false })
//                 dispatch({ type: 'CHANGE_ISLOGIN', value: true })
//                 dispatch({ type: 'CHANGE_USER', value: dataUser })
//                 resolve(dataUser)
//             })
//             .catch(function (error) {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 alert(errorMessage)
//                 dispatch({ type: 'CHANGE_LOADING', value: false })
//                 dispatch({ type: 'CHANGE_ISLOGIN', value: false })
//                 reject(false)
//             })
//     })
// }

// export const addDataToAPI = (data) => (dispatch) => {
//     database.ref('notes/' + data.userId).push({
//         kejahatan: data.kejahatan,
//         date: data.date,
//         nama: data.nama,
//         telpon: data.telpon,
//         alamat: data.alamat,
//         deskripsi: data.deskripsi
//     })
// }

// export const getDataFromAPI = (userId) => (dispatch) => {
//     const urlNotes = database.ref('notes/' + userId);
//     return new Promise((resolve, reject) => {
//         urlNotes.on('value', function (snapshot) {
//             const data = [];
//             if (snapshot.val() !== null)
//                 Object.keys(snapshot.val()).map(key => {
//                     data.push({
//                         id: key,
//                         data: snapshot.val()[key]
//                     })
//                 });
//             dispatch({ type: 'SET_NOTES', value: data })
//             resolve(snapshot.val())
//         });
//     })
// }

// export const updateDataAPI = (data) => (dispatch) => {
//     const urlNotes = database.ref('notes/' + data.userId + '/' + data.noteId);
//     return new Promise((resolve, reject) => {
//         urlNotes.set({
//             kejahatan: data.kejahatan,
//             date: data.date,
//             nama: data.nama,
//             telpon: data.telpon,
//             alamat: data.alamat,
//             deskripsi: data.deskripsi
//         }, (err) => {
//             if (err) {
//                 reject(false);
//             } else {
//                 resolve(true)
//             }
//         });
//     })
// }

// export const deleteDataAPI = (data) => (dispatch) => {
//     const urlNotes = database.ref('notes/' + data.userId + '/' + data.noteId);
//     return new Promise((resolve, reject) => {
//         urlNotes.remove();
//     })
// }

// export const logout = () => (dispatch) => {
//     auth.signOut()
// }
