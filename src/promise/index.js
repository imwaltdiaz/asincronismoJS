const somethingWilHappen = () => {
  return new Promise((resolve, reject) => {
    if (true){
      resolve('Hey!');
    }
    else {
      reject('Whoops');
    }
  })
};

somethingWilHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err))

const somethingWilHappen2 = () => {
  return new Promise((resolve, reject) => {
    if (true){
      setTimeout(() => {
        resolve('True');
      }, 2000)
    }
    else {
      const error = new Error('Whoops!')
      reject(error)
    }
  })
}
somethingWilHappen2()
  .then(response => console.log(response))
  // .then(()=> console.log('hola'))
  //podemos sacar mas then con un console log
  .catch(err => console.error(err))
  //El new error te botará en el caso de false en la promesa diciendote donde esta el error para hacer un debugging

Promise.all([somethingWilHappen(), somethingWilHappen2()])
  .then(response => {
    console.log('Array of results', response)
  })
  .catch(err => {
    console.error(err)
  })
//Te botará Array of results [ 'Hey!', 'True' ]
