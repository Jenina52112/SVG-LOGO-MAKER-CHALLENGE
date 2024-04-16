const inquirer = require('inquirer')
const fs = require('fs')
const {Circle, Triangle, Square} = require('./lib/shapes')
const Svg = require('./lib/svg.js')

inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'What text would you want for your logo?',
        validate: text => text.length <= 3 || 'not more than three characters'
    },
    {
        type: 'input',
        name: 'fontcolor',
        message: 'What color do you want for the text?',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'What shape do you want for your logo?',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'color',
        message: 'What color is the shape?',
    }
    
   
])
.then(answers => {
    let shape;
    if(answers.shape ==="circle")shape = new Circle()
    else if(answers.shape === "triangle")shape = new Triangle()
    else shape = new Square()

    shape.setColor(answers.color)
    const svg = new Svg()
    svg.setText(answers.text, answers.fontcolor)
    svg.setShape(shape)
    fs.writeFile('logo.svg', svg.render(), err =>{
        if(err)console.log(err)
        else console.log('Generated logo.svg')
    })
})