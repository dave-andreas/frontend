// var INITIAL_STATE={
//     id:'',
//     username:'',
//     email:'',
//     role:'',
//     error:'kosong',
//     loading:false
// }
// var action={
//     payload:{
//         id:5,
//         username:'ada',
//         role:'kacung'
//     }
// }

// INITIAL_STATE={...INITIAL_STATE, ...action.payload, error:'ada', loading:true}

// console.log(INITIAL_STATE)
// console.log('masuk')
function staircase(a) {
    for(var i=0;i<a;i++){
        var output=''
        for(var j=0;j<(a-1)-i;j++){
            output+=' '
        }
        for(var j=0;j<=i;j++){
            output+='#'
        }
        // output+='\n'
        console.log(output)
    }
}
console.log(staircase(6))