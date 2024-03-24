// class Schema {
//     constructor(name){
//         this._name = name
//     }
//     getName(){
//         console.log(this._name)
//     }
// }

// const c = new Schema("Dinar")

// c.getName()

// const func = ({ name, age }, index) => {
//     console.log(name, age, index)
// }

// const arr = [
//     {
//         name: "vasa",
//         age: 44
//     },
//     {
//         name: "peta",
//         age: 45
//     }
// ]

// for (let i = 0; i < arr.length; i++) {
//    func(arr[i], i)
// }
// func({name: "teta", age: 20}, 30)

// const func = () => {
//     return 50
// }

// const arrow = ()=> 50

// async function second() {
//     return 50
//     console.log("first")

// }

// let d = second()

// console.log(d)

// const vasa = {
//     name: "vasa",
//     getNamge() {
//         console.log(this.name)
//     }
// }


// vasa.getNamge()

// let a= []
// for (let i = 0; i < 10; i++) {
//     a.push(i)  
// }
// console.log(a)

// function narcissistic(value) {
//     numArray = [...value.toString()].map(Number)
//     let sum = 0
//     for (let i = 0; i < numArray.length; i++) {
//         sum += Math.pow(numArray[i], numArray.length)
//     }
//     if (value !== sum) {
//         return false
//     } else {
//         return true
//     }

// }
// console.log(narcissistic(500))

let a = null
let b = []

function comp(array1, array2) {

    if(null || array2.length == 0) {
      return true
    }

    let firstStr = array1.map(el => el ** 2).sort().join()
    let secondStr = array2.sort().join()

        if (firstStr !== secondStr) {
            return false
        } else {
           return true
        }
}

comp(a, b)