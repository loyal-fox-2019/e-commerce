module.exports = (firstName, lastName) =>{
    let convertFirstName = []
    if(firstName)
      {
        firstName.replace(/\s+/g,' ').split(' ').forEach(element => {
            convertFirstName.push(element[0].toUpperCase() + element.slice(1))
        });
      }
    
    let convertLastName = []
    if(lastName)
      {
        lastName.replace(/\s+/g,' ').split(' ').forEach(element => {
            convertLastName.push(element[0].toUpperCase() + element.slice(1))
        });
      }
      
    return `${convertFirstName.join(' ')} ${convertLastName.join(' ')}`.trim()
}