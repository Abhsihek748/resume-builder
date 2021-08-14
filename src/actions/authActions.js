import * as actionTypes from './actionTypes';

export const signInRequest =()=>{
    return {
        type: actionTypes.SIGN_IN,
    }
}
export const signInSuccess =()=>{
    return{
        type : actionTypes.SIGN_IN_SUCCESS
    }
}
export const signinFailure =(err)=>{
    return{
        type: actionTypes.SIGN_IN_FAILED,
        error:err,
    }
}

export const removeError =()=>{
    return{
        type : actionTypes.REMOVE_ERROR,
    }
}

export const SignIn =(userData)=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(signInRequest());
        const firebase = getFirebase();

        try{
         let data = await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password);
         dispatch(signInSuccess());
        }
        catch(err){
          dispatch(signinFailure(err));
          setTimeout(()=>{
              dispatch(removeError());
          },2000)
        }
    }
}

export const registerRequest =()=>{
    return {
        type:actionTypes.REGISTER_REQUEST
    }
}
export const registerSuccess = ()=>{
    return {
        type:actionTypes.REGISTER_SUCCESS
    }
}

export const registerFailed = (err)=>{
    return{
        type:actionTypes.REGISTER_FAILED,
        error:err
    }
}

export const register =(userdata)=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(registerRequest());
        try{
        let firebase = getFirebase();
        let firestore = getFirestore();

        let data = await firebase.auth().createUserWithEmailAndPassword(userdata.email,userdata.password);
        const res = await firestore.collection('users').doc(data.user.uid).set({
            email:userdata.email,
            resume :[],
        })
        dispatch(registerSuccess());
        }
        catch(err){
            dispatch(registerFailed(err));
            setTimeout(()=>{
                dispatch(removeError())
            },2000)
        }
    }
}
export  const signOut= ()=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({type:actionTypes.SIGN_OUT})
        }).catch((err)=>{
            dispatch({type:actionTypes.SIGN_OUT_FAILED,error:err})
        })
    }
}