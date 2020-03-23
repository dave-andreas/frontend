var INITIAL_STATE={
    id:'',
    username:'',
    email:'',
    role:'',
    error:'kosong',
    loading:false
}
var action={
    payload:{
        id:5,
        username:'ada',
        role:'kacung',
        bla:'bla'
    }
}

var kucing=3000

// console.log({...INITIAL_STATE,kucing})

// console.log('masuk')
// function staircase(a) {
//     for(var i=0;i<a;i++){
//         var output=''
//         for(var j=0;j<(a-1)-i;j++){
//             output+=' '
//         }
//         for(var j=0;j<=i;j++){
//             output+='#'
//         }
//         // output+='\n'
//         console.log(output)
//     }
// }
// console.log(staircase(6))
// var b='ACA'
// var c=b.split('')
// var a=b.push('w')
// a.push('m')
// console.log(c)
// console.log(b.split(''))


// var arr=[]
// arr[2]='piga'

// console.log(arr[3])

// var fab = ['katun', 'silk', 'denim']

// var allfab = ['katun', 'chiffon', 'silk', 'linen', 'denim','par']

// console.log(fab.indexOf('chiffon'))

// let buah = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];

// let buah2 = buah.slice(2);
// console.log(buah2)

// let buah4 = buah.slice(1,5);
// console.log(buah4)

// let nama1 = ['Andi','Budi'];
// let nama2 = ['Andi','Dede','Euis'];

// let nama3 = nama1.concat(nama2); 
// let nama4 = nama2.concat(nama1); 

// console.log(nama3)
// console.log(nama4)

// let buah = ['Jeruk','Nanas','Apel'];
// buah.shift(2);
// console.log(buah)
// buah.unshift('Lemon');
// console.log(buah)

// let buah = ['Jeruk','Nanas','Apel'];
// buah.splice(2, 0, 'Lemon', 'Kiwi');
// console.log(buah)
// buah.splice(1, 1);
// console.log(buah)

// delete buah[0];
// console.log(buah[0])

// const a = {val:'gg',id:2}
// const b = {val:'g',id:3}
// const c = {val:'h', id:4}

// var arr = [a,b,c]

// console.log(a.id === b.id ? true : false)

// console.log(arr.indexOf({val:'g',id:3}))


// var arr = []
// arr.push('oke')
// arr.push('lah')
// console.log(arr)

// var ehe = 'public//asdas'

// console.log(ehe[0])

function orderstat (stat) {
    switch (stat) {
        case 0 : return 'order entry'
        case 1 : return 'waiting for payment confirmation'
        case 2 : return 'payment confirmed'
        case 3 : return 'clothes are being made'
        case 4 : return 'clothes are already completed'
        case 5 : return 'being sent'
        case 6 : return 'wait for user confirmation'
        case 7 : return 'order completed'
    }
}

function orderdetilstat (stat) {
    switch (stat) {
        case 0 : return 'clothes are being made'
        case 1 : return 'clothes are already completed'
    }
}

var date = new Date()
// console.log(date)
// console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ; ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

var arr = [
    {id: 1, name: "outerwear"},{id: 2, name: "atasan"},{id: 3, name: "dress"}
]
arr.push({id: 4, name: "jumpsuit"})
console.log(arr)